import { useMutation } from "@tanstack/react-query";
import { todos } from "../store/todos";

export const useUpdateTodoMutation = () => {
  return useMutation(async ({ id, newText }) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        const foundIndex = todos.findIndex((todo) => todo.id === id);

        if (foundIndex > -1) {
          todos[foundIndex].text = newText;
          resolve(todos);
        }
      }, 150);
    });
  });
};
