import { createSlice } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

//redux toolkit

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { changeTheme, setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer

export type appInitialState = ReturnType<typeof appSlice.getInitialState>

//redux
// type InitialState = typeof initialState
// const initialState = {
//   themeMode: "light" as ThemeMode,
//   status: "idle" as RequestStatus,
//   error: null as string | null,
// }
// export const _appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
//   switch (action.type) {
//     case "CHANGE_THEME":
//       return { ...state, themeMode: action.payload.themeMode }
//     case "SET_STATUS":
//       return { ...state, status: action.payload.status }
//     case "SET_ERROR":
//       return { ...state, error: action.payload.error }
//     default:
//       return state
//   }
// }
//
// // Action creators
// export const changeThemeAC = (themeMode: ThemeMode) => {
//   return {
//     type: "CHANGE_THEME",
//     payload: { themeMode },
//   } as const
// }
// export const setAppStatusAC = (status: RequestStatus) => {
//   return {
//     type: "SET_STATUS",
//     payload: { status },
//   } as const
// }
// export const setAppErrorAC = (error: string | null) => {
//   return {
//     type: "SET_ERROR",
//     payload: { error },
//   } as const
// }
//
// // Actions types
// type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
// type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
//
// type ActionsType = ChangeThemeActionType | SetAppStatusActionType | SetAppErrorActionType
