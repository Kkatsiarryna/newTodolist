import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import { DomainTodolist } from "../../../../../lib/types"

//import {EditableSpan} from "common/components/EditableSpan/EditableSpan";

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  //RTK QUERY
  const [removeTask, {}] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
  }

  const _model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      ..._model,
      status,
    }
    updateTask({ task, model })
  }
  const changeTaskTitleHandler = (title: string) => {
    const model: UpdateTaskModel = {
      ..._model,
      title,
    }
    updateTask({ task, model })
  }

  //REDUX
  //const dispatch = useAppDispatch()

  // const removeTaskHandler = () => {
  //   //dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }))
  //   dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  // }
  //
  // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   // const isDone = e.currentTarget.checked
  //   // dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }))
  //   let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
  //   //dispatch(changeTaskStatusTC({ taskId: task.id, status, todolistId: todolist.id }))
  //   dispatch(updateTaskTC({ task, domainModel: { status } }))
  // }
  //
  // const changeTaskTitleHandler = (title: string) => {
  //   //dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }))
  //   dispatch(updateTaskTC({ task, domainModel: { title } }))
  // }

  const isCompleted = task.status === TaskStatus.Completed
  const isDisabled = todolist.entityStatus === "loading"

  return (
    <ListItem key={task.id} sx={getListItemSx(isCompleted)}>
      <div>
        <Checkbox checked={isCompleted} onChange={changeTaskStatusHandler} disabled={isDisabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={isDisabled} />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={isDisabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
