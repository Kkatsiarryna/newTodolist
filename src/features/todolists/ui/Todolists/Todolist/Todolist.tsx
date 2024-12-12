import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "../../../model/todolistsSlice"
import { useAddTaskMutation } from "../../../api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const [addTask, {}] = useAddTaskMutation()

  // const dispatch = useAppDispatch()

  const addTaskCallback = (title: string) => {
    //dispatch(addTaskAC({ title, todolistId: todolist.id }))
    //dispatch(addTaskTC({ title, todolistId: todolist.id }))
    addTask({ title, todolistId: todolist.id })
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
