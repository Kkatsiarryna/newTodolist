import { BaseResponse } from "common/types"
import { Todolist } from "./todolistsApi.types"
import { baseApi } from "app/baseApi"
import { DomainTodolist } from "../lib/types"

//RTK QUERY
export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => {
          return {
            url: "todo-lists",
            method: "GET",
          }
        },
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
        providesTags: ["Todolist"],
      }),
      addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            url: "todo-lists",
            method: "POST",
            body: { title },
          }
        },
        invalidatesTags: ["Todolist"],
      }),
      removeTodolist: build.mutation<BaseResponse, string>({
        //типизация 1 что возвращает сервер, 2 типизац аргумента
        query: (id) => {
          return {
            method: "DELETE",
            url: `todo-lists/${id}`,
          }
        },
        //Этот метод обеспечивает обработку действия на уровне локального состояния,
        // улучшая пользовательский интерфейс за счет временного обновления состояния и предоставления обратной связи о ходе выполнения запроса.
        async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
          //queryFulfilled - Это промис, который разрешается, когда запрос завершается успешно
          const patchResult = dispatch(
            todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
              const index = state.findIndex((tl) => tl.id === id)
              if (index !== -1) {
                state[index].entityStatus = "loading" //disable todolist
                //state.splice(index, 1) - удалить тудулист
              }
            }),
          )
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ["Todolist"],
      }),
      updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
        query: ({ id, title }) => {
          return {
            method: "PUT",
            url: `todo-lists/${id}`,
            body: {
              title,
            },
          }
        },
        invalidatesTags: ["Todolist"],
      }),
    }
  },
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useUpdateTodolistTitleMutation,
  useRemoveTodolistMutation,
} = todolistsApi

//REDUX
// export const _todolistsApi = {
//   getTodolists() {
//     return instance.get<Todolist[]>("todo-lists")
//   },
//   createTodolist(title: string) {
//     return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
//   },
//   removeTodolist(id: string) {
//     return instance.delete<BaseResponse>(`todo-lists/${id}`)
//   },
//   updateTodolist(payload: { id: string; title: string }) {
//     const { id, title } = payload
//     return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
//   },
// }
