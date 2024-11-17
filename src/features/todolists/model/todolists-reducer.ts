// import { Todolist } from "../api/todolistsApi.types"
// import { todolistsApi } from "../api/todolistsApi"
// import { AppDispatch } from "app/store"
// import { RequestStatus, setAppErrorAC, setAppStatusAC } from "app/appSlice"
// import { handleServerNetworkError } from "common/utils"
// import { ResultCode } from "../lib/enums"
// import { handleServerAppError } from "common/utils/handleServerAppError"
// import { Dispatch } from "redux"
// import { fetchTasksTC } from "./tasks-reducer"
//
// export type FilterValuesType = "all" | "active" | "completed"
//
// // export type TodolistType = {
// //   id: string
// //   title: string
// //   filter: FilterValuesType
// // }
//
// export type DomainTodolist = Todolist & {
//   filter: FilterValuesType
//   entityStatus: RequestStatus
// }
//
// const initialState: DomainTodolist[] = []
//
// export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
//   switch (action.type) {
//     case "SET-TODOLISTS": {
//       return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
//     }
//     case "REMOVE-TODOLIST": {
//       return state.filter((tl) => tl.id !== action.payload.id)
//     }
//     case "ADD-TODOLIST": {
//       // const newTodolist: DomainTodolist = {
//       //   id: action.payload.todolistId,
//       //   title: action.payload.title,
//       //   filter: "all",
//       //   order: 1,
//       //   addedDate: "",
//       // }
//       // return [...state, newTodolist]
//
//       const newTodolist: DomainTodolist = {
//         ...action.payload.todolist,
//         filter: "all",
//         entityStatus: "idle",
//       }
//
//       return [newTodolist, ...state]
//     }
//
//     case "CHANGE-TODOLIST-TITLE": {
//       return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
//     }
//
//     case "CHANGE-TODOLIST-FILTER": {
//       return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
//     }
//
//     case "CHANGE-TODOLIST-ENTITY-STATUS": {
//       return state.map((tl) =>
//         tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
//       )
//     }
//
//     case "CLEAR_DATA": {
//       return []
//     }
//
//     default:
//       return state
//   }
// }
//
// // Action creators
// export const removeTodolistAC = (id: string) => {
//   return { type: "REMOVE-TODOLIST", payload: { id } } as const
// }
//
// // export const addTodolistAC = (title: string) => {
// //   return { type: "ADD-TODOLIST", payload: { title, todolistId: v1() } } as const
// // }
//
// export const addTodolistAC = (todolist: Todolist) => {
//   return { type: "ADD-TODOLIST", payload: { todolist } } as const
// }
//
// export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
//   return { type: "CHANGE-TODOLIST-TITLE", payload } as const
// }
//
// export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
//   return { type: "CHANGE-TODOLIST-FILTER", payload } as const
// }
//
// export const setTodolistsAC = (todolists: Todolist[]) => {
//   return { type: "SET-TODOLISTS", todolists } as const
// }
// export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
//   return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
// }
//
// export const clearTodosDataAC = () => {
//   return { type: "CLEAR_DATA" } as const
// }
//
// //thunck
// export const fetchTodolistsTC = () => (dispatch: any) => {
//   //on
//   dispatch(setAppStatusAC("loading"))
//   todolistsApi
//     .getTodolists()
//     .then((res) => {
//       //of
//       dispatch(setAppStatusAC("succeeded"))
//       dispatch(setTodolistsAC(res.data))
//       return res.data
//     })
//     .then((todos) => {
//       todos.forEach((tl) => {
//         dispatch(fetchTasksTC(tl.id))
//       })
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   todolistsApi
//     .createTodolist(title)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatusAC("succeeded"))
//         dispatch(addTodolistAC(res.data.data.item))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
//   todolistsApi
//     .removeTodolist(id)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatusAC("succeeded"))
//         dispatch(removeTodolistAC(id))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC("loading"))
//   todolistsApi
//     .updateTodolist(arg)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatusAC("succeeded"))
//         dispatch(changeTodolistTitleAC(arg))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// // Actions types
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
// export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
// export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
// export type ClearTodosDataAtionType = ReturnType<typeof clearTodosDataAC>
//
// type ActionsType =
//   | RemoveTodolistActionType
//   | AddTodolistActionType
//   | ChangeTodolistTitleActionType
//   | ChangeTodolistFilterActionType
//   | SetTodolistsActionType
//   | ChangeTodolistEntityStatusActionType
//   | ClearTodosDataAtionType
