import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import { Header } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { ErrorSnackbar } from "common/components"
import { Outlet } from "react-router-dom"
import { setIsLoggedIn } from "../features/auth/model/authSlice"
import CircularProgress from "@mui/material/CircularProgress"
import s from "./App.module.css"
import { selectThemeMode } from "app/appSlice"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "../features/todolists/lib/enums"

export const App = () => {
  //REDUX
  // const themeMode = useAppSelector(selectThemeMode)
  //
  // const dispatch = useAppDispatch()
  // const isInitialized = useAppSelector(selectIsInitialized)
  //
  // useEffect(() => {
  //   dispatch(initializeAppTC())
  // }, [])

  //RTK QUERY

  const themeMode = useAppSelector(selectThemeMode)

  const [isInitialized, setIsInitialized] = useState(false)

  const dispatch = useAppDispatch()

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      {/*<Header />*/}
      {/*<Main />*/}
      {/*<Outlet />*/}

      {isInitialized && (
        <>
          <Header />
          <Outlet />
        </>
      )}
      {!isInitialized && (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
