import create from 'zustand'

const useLikesStore = create(() => ({
    likedTodoIds: []
}))

export default useLikesStore