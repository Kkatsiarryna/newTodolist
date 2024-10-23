import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { changeTaskStatusTC, changeTaskTitleAC, removeTaskTC } from "../../../../../model/tasks-reducer"
import { DomainTodolist } from "../../../../../model/todolists-reducer"
import { getListItemSx } from "./Task.styles"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums"

//import {EditableSpan} from "common/components/EditableSpan/EditableSpan";

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    //dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }))
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // const isDone = e.currentTarget.checked
    // dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }))

    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    //dispatch(changeTaskStatusTC({ taskId: task.id, status, todolistId: todolist.id }))
    dispatch(changeTaskStatusTC({ task, status }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }))
  }

  const isCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem key={task.id} sx={getListItemSx(isCompleted)}>
      <div>
        <Checkbox checked={isCompleted} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
