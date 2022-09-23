import { memo, useState } from "react";
import { useLikesStore } from "../../store/likes";
import Button from "../system/Button";
import Input from "../system/Input";

export default memo(({ todo, onChange, onRemove }) => {
  const [currentText, setCurrentText] = useState(todo.text);
  const [areaMode, setAreaMode] = useState(true);

  const areaModeHandle = () => {
    setAreaMode(!areaMode);
  };

  const likedTodos = useLikesStore((state) => state.likedTodos);
  const foundLikedTodo = likedTodos.findIndex((t) => t.id === todo.id);

  return (
    <div className="w-96 h-16 my-4 px-2 py-9 flex justify-between items-center border border-gray-200 rounded-lg shadow-xl">
      <Input
        className="px-1 read-only:outline-none read-only:bg-transparent read-only:border-none"
        placeholder="Enter title"
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        readOnly={areaMode}
      />

      <div className="flex rounded-lg border border-indigo-800 overflow-hidden">
        <Button
          title="Like"
          onClick={() => {
            useLikesStore.setState((prevState) => {
              if (foundLikedTodo > -1) {
                prevState.likedTodos.splice(foundLikedTodo, 1);
                return { likedTodos: [...prevState.likedTodos] };
              } else {
                return {
                  likedTodos: [...prevState.likedTodos, todo],
                };
              }
            });
          }}
        />

        <div className="flex flex-col">
          {areaMode ? (
            <Button title="Change" onClick={areaModeHandle} />
          ) : (
            <Button
              title="Apply"
              onClick={() => {
                onChange(todo.id, currentText);
                areaModeHandle();
              }}
            />
          )}

          <Button title="Remove" onClick={() => onRemove(todo.id)} />
        </div>
      </div>
    </div>
  );
});
