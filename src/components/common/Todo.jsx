import {memo, useState} from 'react'
import useLikesStore from '../../store/likes'
import Button from '../system/Button'
import Input from '../system/Input'

export default memo(({todo, onChange, onRemove}) => {
  const [currentText, setCurrentText] = useState(todo.text)
  const [areaMode, setAreaMode] = useState(true)

  const areaModeHandle = () => {
    setAreaMode(!areaMode)
  }

  return (
    <div className='w-80 h-12 my-4 px-2 flex justify-between items-center border border-gray-500 bg-slate-200'>
      <Input
        classes={'px-1 read-only:outline-none read-only:bg-transparent read-only:border-none'}
        placeholder={'Enter title'}
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        readOnly={areaMode}
      />

      <div className='flex'>
        <button
          className='text-xs px-1 border border-gray-500 bg-gray-100'
          onClick={() => useLikesStore.setState(state => {
            const foundIndex = state.likedTodoIds.indexOf(todo.id)

            foundIndex > -1
            ? state.likedTodoIds.splice(foundIndex, 1)
            : state.likedTodoIds.push(todo.id)

            return {...state}
          })}
        >Like</button>

        <div className='flex flex-col'>
          {areaMode
          ? <Button
              title='Change'
              onClick={areaModeHandle}
            />

          : <Button
              title='Apply'
              onClick={() => {
                onChange(todo.id, currentText)
                areaModeHandle()
              }}
          />}

          <button
            className='text-xs px-1 border border-gray-500 bg-gray-100'
            onClick={() => onRemove(todo.id)}
          >Remove</button>
        </div>
      </div>
    </div>
  )
})
