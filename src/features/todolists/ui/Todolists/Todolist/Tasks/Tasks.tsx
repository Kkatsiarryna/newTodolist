import List from "@mui/material/List"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Task } from "./Task/Task"
import { useAppDispatch } from "common/hooks"
import { TaskStatus } from "../../../../lib/enums"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { selectTasks } from "../../../../model/tasksSlice"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    //tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    //tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
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
