import List from "@mui/material/List"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Task } from "./Task/Task"
import { useAppDispatch } from "common/hooks"
import { TaskStatus } from "../../../../lib/enums"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { selectTasks } from "../../../../model/tasksSlice"
import { useGetTasksQuery } from "../../../../api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  //RTK QUERY
  const { data } = useGetTasksQuery(todolist.id)

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

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
