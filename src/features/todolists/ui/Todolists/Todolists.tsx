import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2"
import React from "react"
import { Todolist } from "./Todolist/Todolist"
import { useGetTodolistsQuery } from "../../api/_todolistsApi"

export const Todolists = () => {
  //RTK QUERY
  const { data: todolists } = useGetTodolistsQuery()

  //REDUX
  //const todolists = useAppSelector(selectTodolists)
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
