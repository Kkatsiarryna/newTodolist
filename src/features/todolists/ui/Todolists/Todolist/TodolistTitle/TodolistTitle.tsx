import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import s from "./TodolistTitle.module.css"
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"
import { RequestStatus } from "app/appSlice"
import { useAppDispatch } from "common/hooks"
import { DomainTodolist } from "../../../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  //RTK QUERY
  const [updateTodolistTitle, {}] = useUpdateTodolistTitleMutation()
  const [removeTodolist] = useRemoveTodolistMutation()
  const dispatch = useAppDispatch()

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) {
          state[index].entityStatus = status
        }

        // const todolist = state.find( tl => tl.id === id)
        // if(todolist){
        //   todolist.entityStatus = status
        // }
      }),
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData("loading")
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData("idle")
      })
  }

  //REDUX
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
