import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useAppDispatch } from "common/hooks"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import { todolistsApi } from "../../../../api/todolistsApi"
import { DomainTodolist, FilterValues } from "../../../../lib/types"

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist

  const dispatch = useAppDispatch()

  //RETK QUERY
  const changeFilterTasksHandler = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData(
        // 1 endpoint
        "getTodolists",
        // 2 аргументы которые приходят в endpoint
        undefined,
        // 3 updateRecipe - коллбек, в котором мутабельным образом можем изменить закешированный стейт
        (state) => {
          const index = state.findIndex((tl) => tl.id === id)
          if (index !== -1) {
            state[index].filter = filter
          }
        },
      ),
    )
  }
  //REDUX
  // const changeFilterTasksHandler = (filter: FilterValuesType) => {
  //   dispatch(changeTodolistFilter({ id, filter }))
  // }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
