import React, {memo} from 'react'
import useLikesStore from '../store/likes'

export default memo(() => {
    const {likedTodos} = useLikesStore(state => state)

    return (
        <div>
            <p className='text-xl mt-3'>Liked todos:</p>

            {likedTodos.length
            ? <div className=''>
                {likedTodos.map(({text}, index) => (
                    <div>{index + 1}. {text}</div>
                ))}
            </div>
            : <p className='text-gray-600'>The list is empty</p>}
        </div>
    )
})