import {useQuery} from '@tanstack/react-query'
import {useDebounce} from '../hooks'
import {todos} from '../store/todos'

export const useTodosQuery = (value) => {
    const debounced = useDebounce(value, 100)

    return useQuery(
        ["useFetchTodosQuery", {
            store: todos,
            searchValue: debounced
        }],
        async () => {
            try {
                const response = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve(todos.filter(todo => (
                            todo.text.toLowerCase().includes(debounced.toLowerCase())
                        )))
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
}