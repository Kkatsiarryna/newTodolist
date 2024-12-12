import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import s from "./TodolistTitle.module.css"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  //RTK QUERY
  const [updateTodolistTitle, {}] = useUpdateTodolistTitleMutation()
  const [removeTodolist] = useRemoveTodolistMutation()
  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }
  const removeTodolistHandler = () => {
    removeTodolist(id)
  }

  //REDUX
  // const dispatch = useAppDispatch()
  // const updateTodolistHandler = (title: string) => {
  //   dispatch(updateTodolistTitleTC({ id, title }))
  // }
  // const removeTodolistHandler = () => {
  //   dispatch(removeTodolistTC(id))
  // }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={todolist.entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
