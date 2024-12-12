// import Checkbox from "@mui/material/Checkbox"
// import React, { ChangeEvent, useEffect, useState } from "react"
// import { DomainTask, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
// import { Todolist } from "../features/todolists/api/todolistsApi.types"
// import { todolistsApi } from "../features/todolists/api/todolistsApi"
// import { tasksApi } from "../features/todolists/api/tasksApi"
// import { TaskStatus } from "../features/todolists/lib/enums"
// import { AddItemForm, EditableSpan } from "common/components"
//
// export const AppHttpRequests = () => {
//   // @ts-ignore
//   const [todolists, setTodolists] = useState<Todolist[]>([])
//   const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})
//
//   useEffect(() => {
//     // get todolists
//     todolistsApi.getTodolists().then((res) => {
//       const todolists = res.data
//       setTodolists(todolists)
//       todolists.forEach((tl) => {
//         tasksApi.getTasks(tl.id).then((res) => {
//           setTasks((prevState) => {
//             return { ...prevState, [tl.id]: res.data.items }
//           })
//         })
//       })
//     })
//   }, [])
//
//   const createTodolistHandler = (title: string) => {
//     // create todolist
//     todolistsApi.createTodolist(title).then((res) => {
//       const newTodolist = res.data.data.item
//       setTodolists([newTodolist, ...todolists])
//     })
//   }
//
//   const removeTodolistHandler = (id: string) => {
//     // remove todolist
//     todolistsApi.removeTodolist(id).then(() => {
//       setTodolists(todolists.filter((tl) => tl.id !== id))
//     })
//   }
//
//   const updateTodolistHandler = (id: string, title: string) => {
//     // update todolist title
//     todolistsApi.updateTodolist({ id, title }).then(() => {
//       setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl)))
//     })
//   }
//
//   const createTaskHandler = (title: string, todolistId: string) => {
//     // create task
//     tasksApi.createTask({ title, todolistId }).then((res) => {
//       console.log(res.data)
//       const newTask = res.data.data.item
//
//       setTasks({
//         ...tasks,
//         [todolistId]: [newTask, ...(tasks[todolistId] || [])],
//       })
//     })
//   }
//
//   const removeTaskHandler = (taskId: string, todolistId: string) => {
//     // remove task
//     tasksApi.removeTask({ taskId, todolistId }).then(() => {
//       //console.log(res.data)
//       setTasks({
//         ...tasks,
//         [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
//       })
//     })
//   }
//
//   const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask, todolistId: string) => {
//     let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
//     // update task status
//     const model: UpdateTaskModel = {
//       title: task.title,
//       description: task.description,
//       //status: e.currentTarget.checked ? 2 : 0,
//       status: status,
//       priority: task.priority,
//       startDate: task.startDate,
//       deadline: task.deadline,
//     }
//
//     tasksApi.changeTaskStatus({ todolistId, task, model }).then((res) => {
//       console.log(res.data)
//       const newTask = res.data.data.item
//       setTasks({
//         ...tasks,
//         [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? newTask : t)),
//       })
//     })
//   }
//
//   const changeTaskTitleHandler = (title: string, task: DomainTask) => {
//     // update task title
//     const model: UpdateTaskModel = {
//       title: title,
//       description: task.description,
//       status: task.status,
//       priority: task.priority,
//       startDate: task.startDate,
//       deadline: task.deadline,
//     }
//
//     tasksApi.changeTaskTitle({ task, model }).then((res) => {
//       console.log(res.data)
//       const newTask = res.data.data.item
//       setTasks({
//         ...tasks,
//         [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? newTask : t)),
//       })
//     })
//   }
//
//   return (
//     <div style={{ margin: "20px" }}>
//       <AddItemForm addItem={createTodolistHandler} />
//
//       {/* Todolists */}
//       {todolists.map((tl) => {
//         return (
//           <div key={tl.id} style={todolist}>
//             <div>
//               <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
//               <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
//             </div>
//             <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />
//
//             {/* Tasks */}
//             {!!tasks[tl.id] &&
//               tasks[tl.id].map((task: DomainTask) => {
//                 return (
//                   <div key={task.id}>
//                     <Checkbox
//                       checked={task.status === 2}
//                       //checked={!!task.status}
//                       //checked={Boolean(task.status)}
//                       onChange={(e) => changeTaskStatusHandler(e, task, tl.id)}
//                     />
//                     <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
//                     <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
//                   </div>
//                 )
//               })}
//           </div>
//         )
//       })}
//     </div>
//   )
// }
//
// // Styles
// const todolist: React.CSSProperties = {
//   border: "1px solid black",
//   margin: "20px 0",
//   padding: "10px",
//   width: "300px",
//   display: "flex",
//   justifyContent: "space-between",
//   flexDirection: "column",
// }
