import { useMutation } from "@tanstack/react-query";
import useTodosStore from "../store/todos";

export const useRemoveTodoMutation = () => {
  const todos = useTodosStore((state) => state.todos);

  return useMutation(async (id) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        const foundIndex = todos.findIndex((todo) => todo.id === id);

        useTodosStore.setState((prevState) => {
          return {
            todos: prevState.todos.filter(
              (todo, _, arr) => todo.id !== arr[foundIndex].id
            ),
          };
        });

        resolve(todos);
      }, 150);
    });
  });
};
