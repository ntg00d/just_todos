import {memo} from 'react'

export default memo(({
    title,
    classes = '',
    onClick
}) => {
    return (
        <button
            className={`text-xs px-1 border border-gray-500 bg-gray-100 ${classes}`}
            onClick={onClick}
        >{title}</button>
    )
})