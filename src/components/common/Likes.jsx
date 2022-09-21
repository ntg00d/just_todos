import React, {memo} from 'react'
import {todos} from '../../store/todos'
import useLikesStore from '../../store/likes'

export default memo(() => {
    // !!! Нюанс деструктуризации
    const {likedTodoIds} = useLikesStore(state => state)

    return (
        <div>
            <p className='text-xl mt-6'>Liked todos:</p>

            {likedTodoIds.length
            ? <div className=''>
                {likedTodoIds.map((id, index) => (
                    <div key={index}>
                        {index + 1}. {todos.find(todo => todo.id === id).text}
                    </div>
                ))}
            </div>
            : <p className='text-gray-600'>The list is empty</p>}
        </div>
    )
})