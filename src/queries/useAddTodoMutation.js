import { useMutation } from "@tanstack/react-query";
import useTodosStore from "../store/todos";

export const useAddTodoMutation = () => {
  const todos = useTodosStore((state) => state.todos);

  return useMutation(async (newTodoText) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        const id = (Math.random() * 999999).toFixed();

        useTodosStore.setState((prevState) => {
          return {
            todos: [...prevState.todos, { id, text: newTodoText }],
          };
        });

        resolve(todos);
      }, 150);
    });
  });
};
