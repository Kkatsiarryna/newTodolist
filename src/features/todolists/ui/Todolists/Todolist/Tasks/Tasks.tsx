import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "../TasksPagination/TasksPagination"
import { DomainTodolist } from "../../../../lib/types"
import { useTasks } from "../../../../lib/hooks/useTasks"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { tasks, isLoading, totalCount, page, setPage, error } = useTasks(todolist)

  //Обработка ошибок на уровне useQuery и useMutation
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   if (error) {
  //     if ("status" in error) {
  //       //  FetchBaseQueryError
  //       const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
  //       dispatch(setAppError({ error: errMsg }))
  //     } else {
  //       // SerializedError
  //       dispatch(setAppError({ error: error.message ? error.message : "Some error occurred." }))
  //     }
  //   }
  // }, [error])

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <p>#128187</p>
          <List>
            {tasks?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
