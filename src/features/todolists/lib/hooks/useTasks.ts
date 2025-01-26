import { DomainTodolist } from "../types"
import { useState } from "react"
import { useGetTasksQuery } from "../../api/tasksApi"
import { TaskStatus } from "../enums"

export const useTasks = (todolist: DomainTodolist) => {
  //RTK QUERY
  const { filter, id } = todolist

  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useGetTasksQuery({ todolistId: id, args: { page } })

  let tasks = data?.items

  if (filter === "active") {
    tasks = tasks?.filter((task) => task.status === TaskStatus.New)
  }

  if (filter === "completed") {
    tasks = tasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  //REDUX
  //const tasks = useAppSelector(selectTasks)
  //const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])
  //const allTodolistTasks = tasks[todolist.id]
  //let tasksForTodolist = allTodolistTasks
  // if (todolist.filter === "active") {
  //   //tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
  //   tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
  // }
  //
  // if (todolist.filter === "completed") {
  //   //tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
  //   tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
  // }

  return { tasks, isLoading, page, setPage, totalCount: data?.totalCount, error }
}
