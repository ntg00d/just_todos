import { memo } from "react";

export default memo(
  ({
    className = "",
    placeholder,
    autoFocus = false,
    value,
    onChange,
    readOnly,
  }) => {
    return (
      <input
        type="text"
        className={`${className} border border-solid border-indigo-600 outline-none`}
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    );
  }
);
