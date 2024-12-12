import { createBrowserRouter, Navigate, Outlet, RouteObject, useNavigate } from "react-router-dom"
import { App } from "app/App"
import { Main } from "app/Main"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "common/components"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "app/appSlice"

export const Path = {
  Main: "/",
  Login: "login",
} as const

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return <Outlet />
}

export const router = createBrowserRouter([
  {
    path: Path.Main,
    element: <App />,
    //errorElement: <Page404 />,
    children: [
      {
        path: Path.Main,
        element: <ProtectedRoute />,
        children: [
          {
            path: Path.Main,
            element: <Main />,
          },
        ],
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

//рендер в outlet
// {
//   path: Path.Main,
//   element: <Main />,
// },
// {
//   path: Path.Login,
//   element: <Login />,
// },
// {
//   path: "*",
//   element: <Page404 />,
// },
