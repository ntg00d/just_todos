import React, { memo } from "react";
import { useLikesStore } from "../../store/likes";

export default memo(() => {
  const likedTodos = useLikesStore((state) => state.likedTodos);

  return (
    <div>
      <p className="text-xl mt-6">Liked todos:</p>

      {likedTodos.length ? (
        <div className="">
          {likedTodos.map((todo, index) => {
            return (
              <div key={todo.id}>
                {index + 1}. {todo.text}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">The list is empty</p>
      )}
    </div>
  );
});
