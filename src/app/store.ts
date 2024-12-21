import { UnknownAction } from "redux"
import { appReducer, appSlice } from "./appSlice"
import { ThunkDispatch } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "app/baseApi"

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
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    //[authSlice.name]: authReducer,
    // [todolistsApi.reducerPath]: todolistsApi.reducer,
    // [tasksSlice.name]: tasksReducer,
    // [todolistsSlice.name]: todolistsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
