import { memo, useState } from "react";
import { api } from "./api";
import Likes from "./components/common/Likes";
import Todo from "./components/common/Todo";
import Button from "./components/system/Button";
import Input from "./components/system/Input";
import { useDataQuery } from "./queries/useDataQuery";

export default memo(() => {
  const [newTodoText, setNewTodoText] = useState("");
  const [searchTodo, setSearchTodo] = useState("");

  const todosUrl = "https://63320557a54a0e83d24ac4e5.mockapi.io/todos";
  const todosQuery = useDataQuery(todosUrl);

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
              onClick={async () => {
                if (!newTodoText.length) return;
                await api.post(todosUrl, { text: newTodoText });
                todosQuery.refetch();
                setNewTodoText("");
              }}
            />
          </div>

          <div className="w-full my-3 border border-gray-400 rounded-lg overflow-hidden">
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
          <div>
            {(todosQuery?.data || []).map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onChange={async (id, newText) => {
                  await api.put(`${todosUrl}/${id}`, {
                    text: newText,
                  });
                  todosQuery.refetch();
                }}
                onRemove={async (id) => {
                  await api.delete(`${todosUrl}/${id}`);
                  todosQuery.refetch();
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
