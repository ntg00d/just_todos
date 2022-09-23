import { useMutation } from "@tanstack/react-query";
import useTodosStore from "../store/todos";

export const useUpdateTodoMutation = () => {
  const todos = useTodosStore((state) => state.todos);

  return useMutation(async ({ id, newText }) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        const foundIndex = todos.findIndex((todo) => todo.id === id);

        if (foundIndex > -1) {
          useTodosStore.setState((prevState) => {
            return {
              todos: prevState.todos.map((todo) => {
                return todo.id === id ? { ...todo, text: newText } : todo; // !!!
              }),
            };
          });
          resolve(todos);
        }
      }, 150);
    });
  });
};
