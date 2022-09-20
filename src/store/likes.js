import create from 'zustand'

const useLikesStore = create(set => ({
    count: 0,
    likedTodos: [],

    test: () => set((state) => {
        // const foundIndex = state.likedTodos.findIndex(likedTodo => likedTodo.id === todo.id)

        // foundIndex > -1
        // ? state.likedTodos.splice(foundIndex, 1)
        // : state.likedTodos.push(todo)

        state.count += 1
    })
}))

export default useLikesStore