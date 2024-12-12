import { _tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode } from "../lib/enums"
import { handleServerNetworkError } from "common/utils"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { Dispatch } from "redux"
import { setAppStatus } from "app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, clearTodosData, removeTodolist, todolistsSlice } from "./todolistsSlice"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ task: DomainTask; domainModel: UpdateTaskDomainModel }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      const index = tasks.findIndex((task) => task.id === action.payload.task.id)
      if (index !== -1) {
        //tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        tasks[index] = { ...action.payload.task, ...action.payload.domainModel }
      }
    }),
    // clearTasks: create.reducer(() => {
    //   return {}
    // }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearTodosData, () => {
        return {}
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { setTasks, removeTask, addTask, updateTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer

//thunck

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      const tasks = res.data.items
      dispatch(setTasks({ todolistId, tasks }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _tasksApi
    .removeTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTask(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      //dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
      handleServerNetworkError(error, dispatch)
    })
}

export const addTaskTC = (arg: { todolistId: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTask({ task: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const updateTaskTC = (arg: { task: DomainTask; domainModel: UpdateTaskDomainModel }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  const { task, domainModel } = arg

  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    ...domainModel,
  }

  _tasksApi
    .updateTask({ task, model })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(updateTask({ task: res.data.data.item, domainModel }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
