import { memo, useState } from "react";
import Likes from "./components/common/Likes";
import Todo from "./components/common/Todo";
import Button from "./components/system/Button";
import Input from "./components/system/Input";
import { useAddTodoMutation } from "./queries/useAddTodoMutation";
import { useRemoveTodoMutation } from "./queries/useRemoveTodoMutation";
import { useTodosQuery } from "./queries/useTodosQuery";
import { useUpdateTodoMutation } from "./queries/useUpdateTodoMutation";
// Не подсказывает импорты

export default memo(() => {
  const [newTodoText, setNewTodoText] = useState("");
  const [searchTodo, setSearchTodo] = useState("");

  const todosQuery = useTodosQuery({ search: searchTodo });
  const addTodoMutation = useAddTodoMutation();
  const updateTodoMutation = useUpdateTodoMutation();
  const removeTodoMutation = useRemoveTodoMutation();

  return (
    <div className="flex justify-center mt-20 relative">
      <div className="flex flex-col items-center mx-5">
        <div className="w-80 my-4">
          <div className="w-full flex my-3 border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <Input
              className="w-full h-10 px-3 border-none"
              placeholder="Add todo"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              readOnly={false}
            />
            <Button
              title="+"
              className="!text-2xl !px-3.5 !py-0 border-indigo-600"
              onClick={() => {
                if (!newTodoText.length) return;
                addTodoMutation.mutate(newTodoText);
                setNewTodoText("");
              }}
            />
          </div>

          <div className="w-full my-3 border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <Input
              className="w-full h-10 px-3 border-none"
              placeholder="Search todo"
              value={searchTodo}
              onChange={(e) => setSearchTodo(e.target.value)}
              readOnly={false}
            />
          </div>
        </div>

        {todosQuery.isLoading && <span>Loading...</span>}

        {!todosQuery.isLoading && (
          <div className="todos">
            {(todosQuery?.data || []).map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onChange={(id, newText) => {
                  updateTodoMutation.mutate({ id, newText });
                }}
                onRemove={(id) => {
                  removeTodoMutation.mutate(id);
                }}
              />
            ))}
          </div>
        )}

        {todosQuery.isError && <p>An error has occurred</p>}
      </div>

      <Likes />
    </div>
  );
});
