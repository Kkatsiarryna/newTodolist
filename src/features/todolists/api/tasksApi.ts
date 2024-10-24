import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"

export const tasksApi = {
  getTasks(id: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { todolistId: string; task: DomainTask; model: UpdateTaskModel }) {
    const { todolistId, task, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
  },
  changeTaskTitle(payload: { task: DomainTask; model: UpdateTaskModel }) {
    const { task, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
  },
  updateTask_0(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  updateTask(payload: { task: DomainTask; model: UpdateTaskModel }) {
    const { task, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
  },
}
