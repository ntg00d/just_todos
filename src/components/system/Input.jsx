import {memo} from 'react'

export default memo(({
    classes = '',
    placeholder,
    value,
    onChange,
    readOnly
}) => {
    return <input
        type='text'
        className={`border border-solid border-indigo-600 ${classes}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
    />
})