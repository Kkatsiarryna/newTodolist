import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { addTaskTC } from "../../../model/tasks-reducer"
import { DomainTodolist } from "../../../model/todolists-reducer"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTaskCallback = (title: string) => {
    //dispatch(addTaskAC({ title, todolistId: todolist.id }))
    dispatch(addTaskTC({ title, todolistId: todolist.id }))
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
