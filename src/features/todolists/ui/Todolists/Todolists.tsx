import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2"
import React from "react"
import { Todolist } from "./Todolist/Todolist"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {
  //RTK QUERY
  const { data: todolists, isLoading } =
    useGetTodolistsQuery()
    //   undefined, {
    //   pollingInterval: 3000,
    //   skipPollingIfUnfocused: true,
    // }
  // автоматически повторять запросы через определённые интервалы времени для поддержания актуальности данных

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

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
