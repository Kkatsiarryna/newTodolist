import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import React from "react"
import { AddItemForm } from "common/components"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAddTodolistMutation } from "../features/todolists/api/todolistsApi"

export const Main = () => {
  //RTK QUERY
  const [addTodolist, {}] = useAddTodolistMutation()
  const addTodolistCb = (title: string) => {
    addTodolist(title)
  }

  //REDUX
  // const dispatch = useAppDispatch()
  // const addTodolist = (title: string) => {
  //   dispatch(addTodolistTC(title))
  // }

  //const isLoggedIn = useAppSelector(selectIsLoggedIn)
  // if (!isLoggedIn) {
  //   return <Navigate to={Path.Login} />
  // }

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        {/*<AddItemForm addItem={addTodolist} />*/}
        <AddItemForm addItem={addTodolistCb} />
      </Grid>

      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
