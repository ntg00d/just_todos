import { memo } from "react";

export default memo(
  ({ className = "", placeholder, value, onChange, readOnly }) => {
    return (
      <input
        type="text"
        className={`${className} border border-solid border-indigo-600`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    );
  }
);
