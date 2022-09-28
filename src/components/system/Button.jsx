import { memo } from "react";

export default memo(({ title, className = "", onClick }) => {
  return (
    <button
      className={`${className} flex justify-center items-center text-xs px-3 py-1 text-white border border-indigo-800 bg-indigo-600 hover:bg-indigo-800 transition-colors`}
      onClick={onClick}
    >
      {title}
    </button>
  );
});
