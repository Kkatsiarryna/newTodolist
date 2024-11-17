import { addTask, removeTask, tasksReducer, TasksStateType, updateTask } from "../tasksSlice"
import { addTodolist, removeTodolist } from "../todolistsSlice"
import { TaskStatus } from "../../lib/enums"

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        todoListId: "todolistId1",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      {
        id: "2",
        title: "JS",
        todoListId: "todolistId1",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      {
        id: "3",
        title: "React",
        todoListId: "todolistId1",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        todoListId: "todolistId2",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      {
        id: "2",
        title: "milk",
        todoListId: "todolistId2",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      {
        id: "3",
        title: "tea",
        todoListId: "todolistId2",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(
    startState,
    removeTask({
      taskId: "2",
      todolistId: "todolistId2",
    }),
  )
  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy()

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        todoListId: "todolistId1",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      {
        id: "2",
        title: "JS",
        todoListId: "todolistId1",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      {
        id: "3",
        title: "React",
        todoListId: "todolistId1",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        todoListId: "todolistId2",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      {
        id: "3",
        title: "tea",
        todoListId: "todolistId2",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(
    startState,
    addTask({
      task: {
        id: "4",
        title: "juce",
        todoListId: "todolistId2",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
    }),
  )

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTask({
      task: {
        id: "1",
        title: "bread",
        todoListId: "todolistId2",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      domainModel: {
        status: TaskStatus.Completed,
      },
    }),
  )

  expect(endState["todolistId2"][0].status).toBe(TaskStatus.Completed)
  expect(endState["todolistId1"][1].status).toBe(TaskStatus.New)
})

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    // changeTaskTitleAC({
    //   taskId: "2",
    //   title: "coffee",
    //   todolistId: "todolistId2",
    // }),
    updateTask({
      task: {
        id: "1",
        title: "bread",
        todoListId: "todolistId2",
        description: "",
        status: TaskStatus.New,
        priority: 0,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
      },
      domainModel: {
        title: "coffee",
      },
    }),
  )

  expect(endState["todolistId2"][0].title).toBe("coffee")
  expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(
    startState,
    addTodolist({
      todolist: {
        id: "newTodo",
        title: "newTodo",
        addedDate: "string",
        order: 0,
      },
    }),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolist({ id: "todolistId2" }))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})
