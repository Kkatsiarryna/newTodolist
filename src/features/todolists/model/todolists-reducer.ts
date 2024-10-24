import { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { AppDispatch } from "app/store"

export type FilterValuesType = "all" | "active" | "completed"

// export type TodolistType = {
//   id: string
//   title: string
//   filter: FilterValuesType
// }

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }
    case "ADD-TODOLIST": {
      // const newTodolist: DomainTodolist = {
      //   id: action.payload.todolistId,
      //   title: action.payload.title,
      //   filter: "all",
      //   order: 1,
      //   addedDate: "",
      // }
      // return [...state, newTodolist]

      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
      }

      return [newTodolist, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }

    default:
      return state
  }
}

// Action creators
export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

// export const addTodolistAC = (title: string) => {
//   return { type: "ADD-TODOLIST", payload: { title, todolistId: v1() } } as const
// }

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

//thunck
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  todolistsApi.removeTodolist(id).then(() => {
    dispatch(removeTodolistAC(id))
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
  todolistsApi.updateTodolist(arg).then(() => {
    dispatch(changeTodolistTitleAC(arg))
  })
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
