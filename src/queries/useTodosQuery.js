import {useQuery} from '@tanstack/react-query'

export const useTodosQuery = (params) => {
    return useQuery(
        ["useFetchTodosQuery", params],
        async () => {
            try {
                const response = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve(params.todos.filter(todo => (
                            todo.text.toLowerCase().includes(params.debounced.toLowerCase())
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