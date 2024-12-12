import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"
import { baseApi } from "app/baseApi"

//RTK QUERY
export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (id: string) => `todo-lists/${id}/tasks`,
      providesTags: ["Task"],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { task: DomainTask; model: UpdateTaskModel }>({
      query: ({ task, model }) => ({
        url: `todo-lists/${task.todoListId}/tasks/${task.id}`,
        method: "PUT",
        body: model,
      }),
      invalidatesTags: ["Task"],
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
