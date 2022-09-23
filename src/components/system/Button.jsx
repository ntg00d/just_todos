import { memo } from "react";

export default memo(({ title, className = "", onClick }) => {
  return (
    <button
      className={`${className} text-xs px-5 py-1 text-white border border-indigo-800 bg-indigo-600 hover:bg-indigo-800 transition-colors`}
      onClick={onClick}
    >
      {title}
    </button>
  );
});
