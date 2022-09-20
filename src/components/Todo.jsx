import {memo, useState} from 'react'
import useLikesStore from '../store/likes'

export default memo(({todo, onChange, onRemove}) => {
  const {test} = useLikesStore(state => state)

  const [currentText, setCurrentText] = useState(todo.text)
  const [areaMode, setAreaMode] = useState(true)

  const areaModeHandle = () => {
    setAreaMode(!areaMode)
  }

  return (
    <div className='w-80 h-12 my-4 px-2 flex justify-between items-center border border-gray-500 bg-slate-200'>
      <input
        className='h-7 p-2 bg-white border border-gray-500 outline-indigo-600 read-only:outline-none read-only:bg-transparent read-only:border-none'
        type='text'
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        readOnly={areaMode}
      />

      <div className='flex'>
        <button
          className='text-xs px-1 border border-gray-500 bg-gray-100'
          onClick={() => test()}
        >Like</button>

        <div className='flex flex-col'>
          {areaMode
          ? <button
              className='text-xs px-1 border border-gray-500 bg-gray-100'
              onClick={areaModeHandle}
            >Change</button>

          : <button
              className='text-xs px-1 border border-gray-500 bg-gray-100'
              onClick={() => {
                onChange(todo.id, currentText)
                areaModeHandle()
              }}
            >Apply</button>}

          <button
            className='text-xs px-1 border border-gray-500 bg-gray-100'
            onClick={() => onRemove(todo.id)}
          >Remove</button>
        </div>
      </div>
    </div>
  )
})
