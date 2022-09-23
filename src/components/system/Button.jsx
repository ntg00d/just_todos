import { memo } from "react";

export default memo(({ title, className = "", onClick }) => {
  return (
    <button
      className={`${className} text-xs px-1 border border-gray-500 bg-gray-100`}
      onClick={onClick}
    >
      {title}
    </button>
  );
});
