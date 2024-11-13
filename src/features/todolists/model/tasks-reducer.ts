import {
  AddTodolistActionType,
  changeTodolistEntityStatusAC,
  ChangeTodolistEntityStatusActionType,
  ClearTodosDataAtionType,
  RemoveTodolistActionType,
} from "./todolists-reducer"
import { AppDispatch } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { ResultCode } from "../lib/enums"
import { handleServerNetworkError } from "common/utils"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { Dispatch } from "redux"

// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET_TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }

    case "ADD-TASK": {
      //const newTask: DomainTask = {
      // title: action.payload.title,
      // isDone: false,
      // id: v1(),

      //   title: action.payload.title,
      //   todoListId: action.payload.todolistId,
      //   startDate: "",
      //   priority: TaskPriority.Low,
      //   description: "",
      //   deadline: "",
      //   status: TaskStatus.New,
      //   addedDate: "",
      //   order: 0,
      //   id: v1(),
      // }
      // return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }

      return {
        ...state,
        [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
      }
    }

    // case "CHANGE_TASK_STATUS": {
    //   // return {
    //   //   ...state,
    //   //   [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
    //   //     t.id === action.payload.taskId
    //   //       ? {
    //   //           ...t,
    //   //           status: action.payload.status,
    //   //         }
    //   //       : t,
    //   //   ),
    //   // }
    //
    //   const task = action.payload.task
    //   return {
    //     ...state,
    //     [task.todoListId]: state[task.todoListId].map((t) =>
    //       t.id === task.id
    //         ? {
    //             ...t,
    //             status: task.status,
    //           }
    //         : t,
    //     ),
    //   }
    // }

    // case "CHANGE_TASK_TITLE": {
    //   return {
    //     //   ...state,
    //     //   [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
    //     //     t.id === action.payload.taskId
    //     //       ? {
    //     //           ...t,
    //     //           title: action.payload.title,
    //     //         }
    //     //       : t,
    //     //   ),
    //     // }
    //     ...state,
    //     [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
    //       t.id === action.payload.task.id
    //         ? {
    //             ...t,
    //             title: action.payload.task.title,
    //           }
    //         : t,
    //     ),
    //   }
    // }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolist.id]: [] }
    //return state

    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }

    case "UPDATE_TASK": {
      return {
        ...state,
        [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
          t.id === action.payload.task.id
            ? {
                ...t,
                ...action.payload.domainModel,
              }
            : t,
        ),
      }
    }

    case "CLEAR_DATA": {
      return {}
    }

    default:
      return state
  }
}

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET_TASKS",
    payload,
  } as const
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const
}

export const updateTaskAC = (payload: { task: DomainTask; domainModel: UpdateTaskDomainModel }) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const
}

// export const addTaskAC = (payload: { title: string; todolistId: string }) => {
//   return {
//     type: "ADD-TASK",
//     payload,
//   } as const
// }

// export const changeTaskStatusAC = (payload: { taskId: string; isDone: boolean; todolistId: string }) => {
//   return {
//     type: "CHANGE_TASK_STATUS",
//     payload,
//   } as const
// }

// export const changeTaskStatusAC = (payload: { taskId: string; status: TaskStatus; todolistId: string }) => {
//   return {
//     type: "CHANGE_TASK_STATUS",
//     payload,
//   } as const
// }

// export const changeTaskStatusAC = (payload: { task: DomainTask }) => {
//   return {
//     type: "CHANGE_TASK_STATUS",
//     payload,
//   } as const
// }

// export const changeTaskTitleAC = (payload: { taskId: string; title: string; todolistId: string }) => {
//   return {
//     type: "CHANGE_TASK_TITLE",
//     payload,
//   } as const
// }

// export const changeTaskTitleAC = (payload: { task: DomainTask }) => {
//   return {
//     type: "CHANGE_TASK_TITLE",
//     payload,
//   } as const
// }

//thunck

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"))
      const tasks = res.data.items
      dispatch(setTasksAC({ todolistId, tasks }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (arg: { todolistId: string; taskId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .removeTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(removeTaskAC(arg))
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
  dispatch(setAppStatusAC("loading"))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(addTaskAC({ task: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
        // dispatch(setAppStatusAC("failed"))
        // dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred"))
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
      // dispatch(setAppErrorAC(err.message))
      // dispatch(setAppStatusAC("failed"))
    })
}

export const updateTaskTC = (arg: { task: DomainTask; domainModel: UpdateTaskDomainModel }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
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

  tasksApi
    .updateTask({ task, model })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(updateTaskAC({ task: res.data.data.item, domainModel }))
      } else {
        handleServerAppError(res.data, dispatch)
        // dispatch(setAppStatusAC("failed"))
        // dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error occurred"))
      }
    })
    .catch((error) => {
      // dispatch(setAppErrorAC(err.message))
      // dispatch(setAppStatusAC("failed"))
      handleServerNetworkError(error, dispatch)
    })
}

// export const changeTaskStatusTC =
//   (arg: { todolistId: string; taskId: string; status: TaskStatus }) =>
//   (dispatch: AppDispatch, getState: () => RootState) => {
//     const { taskId, todolistId, status } = arg
//     const tasksForCurrentTodolist = getState().tasks[todolistId]
//
//     const task = tasksForCurrentTodolist.find((t) => t.id === taskId)
//
//     if (task) {
//       const model: UpdateTaskModel = {
//         status,
//         title: task.title,
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//       }
//
//       tasksApi.updateTask({ taskId, model, todolistId }).then((res) => {
//         const newTask = res.data.data.item
//         dispatch(changeTaskStatusAC({ status, taskId, todolistId }))
//       })
//     }
//   }

// export const changeTaskStatusTC =
//   (arg: { task: DomainTask; status: TaskStatus }) => (dispatch: AppDispatch, getState: () => RootState) => {
//     const { task, status } = arg
//
//     const model: UpdateTaskModel = {
//       status,
//       title: task.title,
//       deadline: task.deadline,
//       description: task.description,
//       priority: task.priority,
//       startDate: task.startDate,
//     }
//
//     tasksApi.updateTask_0({ taskId: task.id, model, todolistId: task.todoListId }).then((res) => {
//       const newTask = res.data.data.item
//       //dispatch(changeTaskStatusAC({ status, taskId: task.id, todolistId: task.todoListId }))
//       dispatch(changeTaskStatusAC({ task: newTask }))
//     })
//   }

// export const changeTaskTitleTC = (arg: { task: DomainTask; title: string }) => (dispatch: AppDispatch) => {
//   const { task, title } = arg
//
//   const model: UpdateTaskModel = {
//     status: task.status,
//     title,
//     deadline: task.deadline,
//     description: task.description,
//     priority: task.priority,
//     startDate: task.startDate,
//   }
//
//   tasksApi.changeTaskTitle({ task, model }).then((res) => dispatch(changeTaskTitleAC({ task: res.data.data.item })))
// }

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
// export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  // | ChangeTaskStatusActionType
  // | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType
  | UpdateTaskActionType
  | ChangeTodolistEntityStatusActionType
  | ClearTodosDataAtionType
