import {memo, useState} from 'react'
import {todos} from './store/todos'
import {useDebounce} from './hooks'
import {useTodosQuery} from './queries/useTodosQuery'
import {useAddTodoMutation} from './queries/useAddTodoMutation'
import {useUpdateTodoMutation} from './queries/useUpdateTodoMutation'
import {useRemoveTodoMutation} from './queries/useRemoveTodoMutation'
import Todo from './components/common/Todo'
import Likes from './components/common/Likes'
import Input from './components/system/Input'
import Button from './components/system/Button'

export default memo(() => {
  const [newTodoText, setNewTodoText] = useState('')
  const [searchTodo, setSearchTodo] = useState('')
  const debounced = useDebounce(searchTodo, 100)

  const todosQuery = useTodosQuery({todos, debounced})
  const addTodoMutation = useAddTodoMutation()
  const updateTodoMutation = useUpdateTodoMutation()
  const removeTodoMutation = useRemoveTodoMutation()

  return (
    <div className='flex justify-center mt-20'>
      <div className='flex flex-col items-center mx-5'>
        <div className='w-80 my-4'>
          <div className='w-full flex my-3'>
            <Input
              classes='w-full h-10 px-3'
              placeholder={'Add todo'}
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              readOnly={false}
            />
            <Button
              title='+'
              classes='text-2xl px-3.5 text-white border border-indigo-600 bg-indigo-600'
              onClick={() => {
                if (!newTodoText.length) return
                addTodoMutation.mutate(newTodoText)
                setNewTodoText('')
              }}
            />
          </div>

          <div className='w-full my-3'>
            <Input
              classes='w-full h-10 px-3'
              placeholder='Search todo'
              value={searchTodo}
              onChange={(e) => setSearchTodo(e.target.value)}
              readOnly={false}
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
      </div>

      <Likes/>
    </div>
  )
})