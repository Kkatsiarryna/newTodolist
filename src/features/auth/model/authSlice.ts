//REDUX TOOLKIT
// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     //isLoggedIn: false,
//     // isInitialized: false,
//   },
//   reducers: (create) => ({
//     // setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => { //подредьюсер
//     //   state.isLoggedIn = action.payload.isLoggedIn
//     // }),
//     setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
//       // state.isInitialized = action.payload.isInitialized
//     }),
//   }),
//   selectors: {
//     // selectIsLoggedIn: (state) => state.isLoggedIn,
//     // selectIsInitialized: (state) => state.isInitialized,
//   },
// })

// export const { setIsLoggedIn } = authSlice.actions
// //export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
// //export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors
// export const { selectIsLoggedIn } = authSlice.selectors
//export const authReducer = authSlice.reducer

// reducers: { //старый синтаксис
//   //подредюсер или экшен
//   setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
//     state.isLoggedIn = action.payload.isLoggedIn
//   },
//   setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
//     state.isInitialized = action.payload.isInitialized
//   },
// },

//REDUX
// type InitialStateType = typeof initialState
//
// const initialState = {
//   isLoggedIn: false,
//   isInitialized: false,
// }
// export const _authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case "AUTH/SET_IS_LOGGED_IN":
//       return { ...state, isLoggedIn: action.payload.isLoggedIn }
//     case "SET_IS_INITIALIZED":
//       return { ...state, isInitialized: action.payload.isInitialized }
//     default:
//       return state
//   }
// }
// Action creators
// const setIsLoggedInAC = (isLoggedIn: boolean) => {
//   return { type: "AUTH/SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
// }
// const setIsInitializedAC = (isInitialized: boolean) => {
//   return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
// }

// Actions types
// export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
// export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
//
// type ActionsType = SetIsLoggedInActionType | SetIsInitializedActionType

// thunks
// export const initializeAppTC = () => (dispatch: Dispatch) => {
//   //dispatch(setAppStatusAC("loading"))
//   dispatch(setAppStatus({ status: "loading" }))
//   _authApi
//     .me()
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         console.log(res)
//         //dispatch(setAppStatusAC("succeeded"))
//         dispatch(setAppStatus({ status: "succeeded" }))
//         //dispatch(setIsLoggedInAC(true))
//         dispatch(setIsLoggedIn({ isLoggedIn: true }))
//       } else {
//         console.log(res)
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
//     .finally(() => {
//       //dispatch(setIsInitializedAC(true))
//       dispatch(setIsInitialized({ isInitialized: true }))
//     })
// }

// export const loginTC = (arg: LoginArgs) => (dispatch: Dispatch) => {
//   //dispatch(setAppStatusAC("loading"))
//   dispatch(setAppStatus({ status: "loading" }))
//   _authApi
//     .login(arg)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         //dispatch(setAppStatusAC("succeeded"))
//         dispatch(setAppStatus({ status: "succeeded" }))
//         //dispatch(setIsLoggedInAC(true))
//         dispatch(setIsLoggedIn({ isLoggedIn: true }))
//         localStorage.setItem("sn-token", res.data.data.token)
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }

// export const logoutTC = () => (dispatch: Dispatch) => {
//   //dispatch(setAppStatusAC("loading"))
//   dispatch(setAppStatus({ status: "loading" }))
//   _authApi
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         //dispatch(setAppStatusAC("succeeded"))
//         dispatch(setAppStatus({ status: "succeeded" }))
//         //dispatch(setIsLoggedInAC(false))
//         dispatch(setIsLoggedIn({ isLoggedIn: false }))
//         localStorage.removeItem("sn-token")
//         dispatch(clearTodosData())
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
