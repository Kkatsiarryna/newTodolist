import { tasksReducer, TasksStateType } from "../tasksSlice"
import { DomainTodolist, todolistsReducer } from "../todolistsSlice"
import { addTodolist } from "../todolistsSlice"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomainTodolist[] = []

  const newTodo = { id: "todolist3", title: "What to watch", filter: "all", addedDate: "", order: 0 }
  const action = addTodolist({ todolist: newTodo })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
