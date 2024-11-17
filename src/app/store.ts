import { combineReducers, UnknownAction } from "redux"
import { tasksReducer } from "features/todolists/model/tasksSlice"
import { todolistsReducer } from "features/todolists/model/todolistsSlice"
import { appReducer } from "./appSlice"
import { ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistsReducer,
//   app: appReducer,
//   auth: authReducer,
// })

//export const store = legacy_createStore(rootReducer)
//export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
