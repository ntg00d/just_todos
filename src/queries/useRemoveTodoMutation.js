import { useMutation } from "@tanstack/react-query";
import { todos } from "../store/todos";

export const useRemoveTodoMutation = () => {
  return useMutation(async (id) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        const foundIndex = todos.findIndex((todo) => todo.id === id);

        if (foundIndex > -1) {
          todos.splice(foundIndex, 1);
          resolve(todos);
        }
      }, 150);
    });
  });
};
