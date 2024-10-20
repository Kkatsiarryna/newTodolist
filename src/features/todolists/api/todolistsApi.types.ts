export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

// export type Response<T = {}> = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: FieldError[]
//     data: T
// }

// type CreateTodolistResponse = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: FieldError[]
//     data: {
//         item:  Todolist
//     }
// }
//
// type DeleteTodolistResponse = {
//     data: {}
//     fieldsErrors: FieldError[]
//     messages: string[]
//     resultCode: number
// }
//
// type UpdateTodolistResponse  = {
//     data: {}
//     fieldsErrors: FieldError[]
//     messages: string[]
//     resultCode: number
// }
