import { createBrowserRouter } from "react-router-dom"
import { App } from "app/App"
import { Main } from "app/Main"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "common/components"

export const Path = {
  Main: "/",
  Login: "login",
} as const

export const router = createBrowserRouter([
  {
    path: Path.Main,
    element: <App />,
    //errorElement: <Page404 />,
    children: [
      //рендер в outlet
      {
        path: Path.Main,
        element: <Main />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
])