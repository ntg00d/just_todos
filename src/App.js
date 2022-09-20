import {memo, useState} from 'react'
import Todo from './components/Todo'
import {useTodosQuery} from './queries/useTodosQuery'
import {useAddTodoMutation} from './queries/useAddTodoMutation'
import {useUpdateTodoMutation} from './queries/useUpdateTodoMutation'
import {useRemoveTodoMutation} from './queries/useRemoveTodoMutation'
import Likes from './components/Likes'

export default memo(() => {
  const [newTodoText, setNewTodoText] = useState('')
  const [searchTodo, setSearchTodo] = useState('')

  const todosQuery = useTodosQuery(searchTodo)
  const addTodoMutation = useAddTodoMutation()
  const updateTodoMutation = useUpdateTodoMutation()
  const removeTodoMutation = useRemoveTodoMutation()

  return (
    <div className='flex flex-col items-center mt-20'>
      <div className='w-80 my-4'>
        <div className='w-full flex my-3'>
          <input
            className='w-full h-10 px-3 border border-solid border-indigo-600'
            placeholder='Add todo'
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button
            className='text-2xl px-3.5 text-white bg-indigo-600'
            onClick={() => {
              if (!newTodoText.length) return
              addTodoMutation.mutate(newTodoText)
              setNewTodoText('')
            }}
          >+</button>
        </div>

        <div className='w-full my-3'>
          <input
            className='w-full h-10 px-3 border border-solid border-indigo-600'
            placeholder='Search todo'
            value={searchTodo}
            onChange={(e) => setSearchTodo(e.target.value)}
          />
        </div>
      </div>

      {todosQuery.isLoading && <span>Loading...</span>}

      {!todosQuery.isLoading && (
        <div className='todos'>
          {(todosQuery?.data || []).map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                onChange={(id, newText) => {
                  updateTodoMutation.mutate({id, newText})
                }}
                onRemove={(id) => {
                  removeTodoMutation.mutate(id)
                }}
              />
            ))}
        </div>
      )}

      {todosQuery.isError && <p>An error has occurred</p>}

      <Likes/>
    </div>
  )
})