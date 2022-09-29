import { memo, useState } from "react";
import Likes from "./components/common/Likes";
import Todo from "./components/common/Todo";
import Button from "./components/system/Button";
import Input from "./components/system/Input";
import { useAddTodoMutation } from "./queries/useAddTodoMutation";
import { useGetTodosQuery } from "./queries/useGetTodosQuery";
import { useRemoveTodoMutation } from "./queries/useRemoveTodoMutation";
import { useUpdateTodoMutation } from "./queries/useUpdateTodoMutation";

export default memo(() => {
  const [newTodoText, setNewTodoText] = useState("");

  const [params, setParams] = useState({
    search: "",
  });

  const todos = useGetTodosQuery(params);
  const addTodo = useAddTodoMutation();
  const updateTodo = useUpdateTodoMutation();
  const removeTodo = useRemoveTodoMutation();

  return (
    <div className="flex justify-center mt-20 relative">
      <div className="flex flex-col items-center mx-5">
        <div className="w-96 my-4">
          <div className="w-full flex my-3 border border-gray-400 rounded-lg overflow-hidden">
            <Input
              className="w-full h-10 px-3 border-none"
              placeholder="Add todo"
              autoFocus={true}
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              readOnly={false}
            />
            <Button
              title="+"
              className="!text-2xl !px-3.5 !py-0 border-indigo-600"
              onClick={() => {
                if (!newTodoText.length) return;
                addTodo.mutate({ text: newTodoText });
                setNewTodoText("");
              }}
            />
          </div>

          <div className="w-full my-3 border border-gray-400 rounded-lg overflow-hidden">
            <Input
              className="w-full h-10 px-3 border-none"
              placeholder="Search todo"
              value={params.search}
              onChange={(e) => {
                setParams((prevState) => ({
                  ...prevState,
                  search: e.target.value,
                }));
              }}
              readOnly={false}
            />
          </div>
        </div>

        {todos.isLoading && <span>Loading...</span>}

        {!todos.isLoading && (
          <div>
            {(todos?.data || []).map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onChange={(id, newText) => {
                  updateTodo.mutate(id, { text: newText });
                }}
                onRemove={(id) => {
                  removeTodo.mutate(id);
                }}
              />
            ))}
          </div>
        )}

        {todos.isError && <p>An error has occurred</p>}
      </div>

      <Likes />
    </div>
  );
});
