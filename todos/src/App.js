import {memo, useState} from 'react'
import {
  useTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useRemoveTodoMutation
} from './hooks'
import Todo from './components/Todo'

export default memo(() => {
  const todosQuery = useTodosQuery()
  const addTodoMutation = useAddTodoMutation()
  const updateTodoMutation = useUpdateTodoMutation()
  const removeTodoMutation = useRemoveTodoMutation()

  const [newTodo, setNewTodo] = useState('')
  const [searchTodo, setSearchTodo] = useState('')

  return (
    <div className='flex flex-col items-center'>
      <div className='w-64 my-4'>
        <div className='w-full flex'>
          <input
            className='border-solid border-2 border-indigo-600'
            placeholder='Add todo'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={() => {
              if (newTodo.length) {
                addTodoMutation.mutate(newTodo)
                setNewTodo('')
              }
            }}
          >+</button>
        </div>

        <div className='search-todo'>
          <input
            className='border-solid border-2 border-indigo-600'
            placeholder='Search todo'
            value={searchTodo}
            onChange={(e) => setSearchTodo(e.target.value)}
          />
        </div>
      </div>

      {todosQuery.isLoading && <span>Loading...</span>}

      {!todosQuery.isLoading && (
        <div className='todos'>
          {(todosQuery?.data || []).filter(todo => (
            todo.text.toLowerCase().includes(searchTodo.toLowerCase())
          )).map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                changeTodo={(id, newText) => {
                  updateTodoMutation.mutate({id, newText})
                }}
                removeTodo={(id) => {
                  removeTodoMutation.mutate(id)
                }}
              />
            ))}
        </div>
      )}

      {todosQuery.isError && <p>An error has occurred</p>}
    </div>
  )
})