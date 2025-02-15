import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"
import { baseApi } from "app/baseApi"

export const PAGE_SIZE = 4

//RTK QUERY
export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE }
        return {
          url: `todo-lists/${todolistId}/tasks`,
          params,
        }
      },
      //providesTags: (res) => (res ? res.items.map(({ id }) => ({ type: "Task", id })) : ["Task"]), //taskid

      // providesTags: (res, err, { todolistId }) => [{ type: "Task", id: todolistId }], //привязываемся к todolistId

      providesTags: (res, err, { todolistId }) =>
        res
          ? [...res.items.map(({ id }) => ({ type: "Task", id }) as const), { type: "Task", id: todolistId }]
          : ["Task"],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (res, err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }],
      //invalidatesTags: (res, err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { task: DomainTask; model: UpdateTaskModel }>({
      query: ({ task, model }) => ({
        url: `todo-lists/${task.todoListId}/tasks/${task.id}`,
        method: "PUT",
        body: model,
      }),
      async onQueryStarted({ task, model }, { dispatch, queryFulfilled, getState }) {
        debugger
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResults: any[] = []
        let todolistId = task.todoListId

        cachedArgsForQuery.forEach(({ args }) => {
          debugger
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, args: { page: args.page } }, (state) => {
                const currentTask = state.items.find((t) => t.id === task.id)
                if (currentTask) {
                  currentTask.status = model.status
                }
              }),
            ),
          )
        })
        try {
          debugger
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (res, err, { task }) => [{ type: "Task", id: task.id }],
      //invalidatesTags: (res, err, { task }) => [{ type: "Task", id: task.todoListId }],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi

//REDUX
export const _tasksApi = {
  getTasks(id: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { todolistId: string; task: DomainTask; model: UpdateTaskModel }) {
    const { todolistId, task, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
  },
  changeTaskTitle(payload: { task: DomainTask; model: UpdateTaskModel }) {
    const { task, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
  },
  updateTask_0(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  updateTask(payload: { task: DomainTask; model: UpdateTaskModel }) {
    const { task, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
  },
}

//   /* ТЭГИ
//    * todo1
//    * [
//    * { type: "Task", id: 1, },
//    * { type: "Task", id: 2, },
//    * { type: "Task", id: 3, },
//    * { type: "Task", id: 4, }
//    * { type: "Task", id: todolistId1 } сначала таски, в конец добавляется тудулист id
//    * ]
//    *
//    * todo2
//    * [
//    * { type: "Task", id: 1, },
//    * { type: "Task", id: 2, },
//    * { type: "Task", id: 3, },
//    * { type: "Task", id: todolistId2 }
//    * ]
//    *
//    * */
