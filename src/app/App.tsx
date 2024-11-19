import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import React, { useEffect } from "react"
import { Header } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { ErrorSnackbar } from "common/components"
import { Outlet } from "react-router-dom"
import { initializeAppTC, selectIsInitialized } from "../features/auth/model/authSlice"
import CircularProgress from "@mui/material/CircularProgress"
import s from "./App.module.css"
import { selectThemeMode } from "app/appSlice"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

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
