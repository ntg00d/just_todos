import {useMutation} from '@tanstack/react-query'
import {todos} from '../store/todos'

export const useAddTodoMutation = () => {
    return useMutation(async newTodoText => {
        await new Promise(resolve => {
            setTimeout(() => {
                const id = (Math.random() * 999999).toFixed()
                todos.push({id, text: newTodoText})
                resolve(todos)
            }, 150)
        })
    })
}