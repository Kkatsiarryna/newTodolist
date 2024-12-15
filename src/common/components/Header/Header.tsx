import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import React from "react"
import { useAppDispatch } from "common/hooks"
import { useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { MenuButton } from "common/components"
import LinearProgress from "@mui/material/LinearProgress"
import { changeTheme, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "app/appSlice"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "../../../features/todolists/lib/enums"
import { baseApi } from "app/baseApi"

export const Header = () => {
  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    // dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  //RTK QUERY
  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem("sn-token")
          //REDUX
          //dispatch(clearTodosData())
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Task", "Todolist"]))
      })
  }

  //REDUX
  // const logoutHandler = () => {
  //   dispatch(logoutTC())
  // }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
