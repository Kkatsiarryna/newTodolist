// import { Todolist } from "../api/todolistsApi.types"
// import { RequestStatus, setAppStatus } from "app/appSlice"
// import { createSlice } from "@reduxjs/toolkit"
// import { DomainTodolist, FilterValues } from "../lib/types"
//
////массив как initialState нельзя расширить
//
// export const todolistsSlice = createSlice({
//   name: "todolists",
//   initialState: [] as DomainTodolist[],
//   reducers: (create) => ({
//     setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
//       return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
//
//       //2
//       // action.payload.todolists.forEach(tl => {
//       //   state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
//       // })
//     }),
//     removeTodolist: create.reducer<{ id: string }>((state, action) => {
// const a = current(state)
//       const index = state.findIndex((todo) => todo.id === action.payload.id)
//       if (index !== -1) {
//         state.splice(index, 1)
//       }
//     }),
//     addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
//       state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
//     }),
//     changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
//       // const index = state.findIndex((todo) => todo.id === action.payload.id)
//       // if (index !== -1) {
//       //   state[index].title = action.payload.title
//       // }
//
//       const todolist = state.find((todo) => todo.id === action.payload.id)
//       if (todolist) {
//         todolist.title = action.payload.title
//       }
//     }),
//     changeTodolistFilter: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
//       const index = state.findIndex((todo) => todo.id === action.payload.id)
//       if (index !== -1) {
//         state[index].filter = action.payload.filter
//       }
//     }),
//     changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
//       const index = state.findIndex((todo) => todo.id === action.payload.id)
//       if (index !== -1) {
//         state[index].entityStatus = action.payload.entityStatus
//       }
//     }),
//     clearTodosData: create.reducer<undefined>(() => {
//       return []
//     }),
//   }),
//   selectors: {
//     selectTodolists: (state) => state,
//   },
// })
//
// export const {
//   setTodolists,
//   removeTodolist,
//   addTodolist,
//   changeTodolistTitle,
//   changeTodolistFilter,
//   changeTodolistEntityStatus,
//   clearTodosData,
// } = todolistsSlice.actions
//
// export const { selectTodolists } = todolistsSlice.selectors
// export const todolistsReducer = todolistsSlice.reducer

//thunck
// export const fetchTodolistsTC = () => (dispatch: any) => {
//   //on
//   dispatch(setAppStatus({ status: "loading" }))
//   todolistsApi
//     .getTodolists()
//     .then((res) => {
//       //of
//       dispatch(setAppStatus({ status: "succeeded" }))
//       dispatch(setTodolists({ todolists: res.data }))
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
//   dispatch(setAppStatus({ status: "loading" }))
//   todolistsApi
//     .createTodolist(title)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({ status: "succeeded" }))
//         dispatch(addTodolist({ todolist: res.data.data.item }))
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
//   dispatch(setAppStatus({ status: "loading" }))
//   dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
//   todolistsApi
//     .removeTodolist(id)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({ status: "succeeded" }))
//         dispatch(removeTodolist({ id }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       dispatch(changeTodolistEntityStatus({ id, entityStatus: "idle" }))
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({ status: "loading" }))
//   todolistsApi
//     .updateTodolist(arg)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({ status: "succeeded" }))
//         dispatch(changeTodolistTitle(arg))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
