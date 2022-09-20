import {memo, useState} from 'react'

export default memo(({todo, changeTodo, removeTodo}) => {
  const [currentText, setCurrentText] = useState(todo.text)
  const [areaMode, setAreaMode] = useState(true)

  const areaModeHandle = () => {
    setAreaMode(!areaMode)
  }

  return (
    <div className='todo'>
      <input
        className='todo__input'
        type='text'
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        readOnly={areaMode}
      />

      <div className='todo__options'>
        {areaMode
        ? <button onClick={areaModeHandle}>Change</button>
        : <button onClick={() => {
            changeTodo(todo.id, currentText)
            areaModeHandle()
          }}>Apply</button>}

        <button onClick={() => removeTodo(todo.id)}>Remove</button>
      </div>
    </div>
  )
})
