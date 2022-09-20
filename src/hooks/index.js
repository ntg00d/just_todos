import {useQuery, useMutation} from '@tanstack/react-query'
import {todos} from '../store/index'

export const useTodosQuery = (params) => (
    useQuery(
        ["useFetchTodosQuery", params],
        async () => {
            try {
                const response = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve(todos)
                    }, 2000)
                })
                return response
            } catch (error) {
                console.log(error)
                return []
            }
        }, {
            slateTime: 999999,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchInterval: false
        }
    )
)

export const useAddTodoMutation = () => (
    useMutation(async (newTodoText) => {
        await new Promise(resolve => {
            setTimeout(() => {
                const id = (Math.random() * 999999).toFixed()
                todos.push({id, text: newTodoText})
                resolve(todos)
            }, 150)
        })
    })
)

export const useUpdateTodoMutation = () => (
    useMutation(async ({id, newText}) => {
        await new Promise(resolve => {
            setTimeout(() => {
                const foundIndex = todos.findIndex((todo) => todo.id === id)

                if (foundIndex > -1) {
                    todos[foundIndex].text = newText
                    resolve(todos)
                }
            }, 150)
        })
    })
)

export const useRemoveTodoMutation = () => (
    useMutation(async (id) => {
        await new Promise(resolve => {
            setTimeout(() => {
                const foundIndex = todos.findIndex((todo) => todo.id === id)
                todos.splice(foundIndex, 1)
                resolve(todos)
            }, 150)
        })
    })
)