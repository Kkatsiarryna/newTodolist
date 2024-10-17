import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'
import axios from "axios";
import {Todolist} from "../features/todolists/ui/Todolists/Todolist/Todolist";

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        // get todolists
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer '
            },
        })
            // .then( res => {
            //     //console.log(res)
            //     setTodolists(res.data)
            //
            //     todolists.forEach(tl => {
            //         axios
            //             .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
            //                 headers: {
            //                     Authorization: 'Bearer 97d6ac1d-0bb7-4bf8-83a1-9ac1f8910091',
            //                     'API-KEY': 'ea242654-cb8f-4f9d-ad91-6077977d20a3',
            //                 },
            //             })
            //             .then(res => {
            //                //console.log(res.data)
            //                setTasks((prev)=> {
            //                    return {...prev, [tl.id]: res.data.items}
            //                })
            //             })
            //     })
            // })
            .then(res => {
                const todolists = res.data
                setTodolists(todolists)
                todolists.forEach((tl) => {
                    axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                        headers: {
                            Authorization: 'Bearer ',
                            'API-KEY': '',
                        },
                    }).then((res) => {
                        setTasks( (prevState)=> {
                            return {...prevState, [tl.id]: res.data.items}
                        } )
                    })
                })
            })

    }, [])

    const createTodolistHandler = (title: string) => {
        // create todolist
        axios.post<Response<{item: Todolist}>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
    {title},
    {
            headers: {
                Authorization: 'Bearer ',
                'API-KEY': '',
            },
        })
            .then( res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
    {
                headers: {
                    Authorization: 'Bearer ',
                    'API-KEY': '',
                },
            })
            .then( () => {
                setTodolists(todolists.filter( tl => tl.id !== id))

            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // update todolist title
        axios.put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                    headers: {
                        Authorization: 'Bearer ',
                        'API-KEY': '',
                    },
            })
            .then( () => {
                setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl ))
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        axios
            .post<Response<{item: DomainTask}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                {title},
            {
                headers: {
                    Authorization: 'Bearer ',
                    'API-KEY': '',
                },
            })
            .then(res => {
                console.log(res.data)
                const newTask = res.data.data.item

                setTasks({ ...tasks, [todolistId]: [newTask, ...(tasks[todolistId] || []) ] })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
        axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
            {
                headers: {
                    Authorization: 'Bearer ',
                    'API-KEY': '',
                },
            })
            .then( (res) => {
                //console.log(res.data)
                setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) } )
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask, todolistId: string) => {
        // update task status
        const model: UpdateTaskModel ={
            title: task.title,
            description: task.description,
            status: e.currentTarget.checked ? 2 : 0,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        axios.put<Response<{item: DomainTask}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
            model,
            {
                headers: {
                    Authorization: 'Bearer ',
                    'API-KEY': '',
                },
            })
            .then( (res) => {
                console.log(res.data)
                const newTask = res.data.data.item
                setTasks({...tasks, [todolistId]: tasks[todolistId].map( t => t.id === task.id ? newTask : t)})
            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        // update task title
        const model: UpdateTaskModel ={
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        axios.put<Response<{item: DomainTask}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model,
            {
                headers: {
                    Authorization: 'Bearer ',
                    'API-KEY': '',
                },
            })
            .then( (res) => {
                console.log(res.data)
               const newTask = res.data.data.item
                setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map( t => t.id === task.id ? newTask : t)})
            })
    }

    return (
        <div style={{ margin: '20px' }}>
            <AddItemForm addItem={createTodolistHandler} />

            {/* Todolists */}
            {todolists.map((tl) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            //checked={!!task.status}
                                            //checked={Boolean(task.status)}
                                            onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}


type FieldError = {
    error: string
    field: string
}
type Response<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: T
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
   // completed: boolean
    status: number // 0 => 2
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}











type CreateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item:  Todolist
    }
}

type DeleteTodolistResponse = {
    data: {}
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}

type UpdateTodolistResponse  = {
    data: {}
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}