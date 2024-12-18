import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { TaskStatus } from "../../../../lib/enums"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { useState } from "react"
import { TasksPagination } from "../TasksPagination/TasksPagination"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState(1)
  //RTK QUERY
  const { data, isLoading } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })

  if (isLoading) {
    return <TasksSkeleton />
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
        <>
          <List>
            {tasksForTodolist?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
