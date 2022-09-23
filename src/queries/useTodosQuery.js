import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../hooks";
import { todos } from "../store/todos";

export const useTodosQuery = (params) => {
  const debounced = useDebounce(params.search, 100);

  const queryParams = {
    ...params,
    search: debounced,
  };

  const todoList = todos.filter((todo) =>
    todo.text.toLowerCase().includes(queryParams.search.toLowerCase())
  ); // Не обновляет с новым массивом

  return useQuery(
    ["useFetchTodosQuery", queryParams],
    async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(todos);
          }, 2000);
        });
        return response;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    {
      slateTime: 999999,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );
};
