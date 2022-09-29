import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const useRemoveTodoMutation = () => {
  const baseUrl = "https://63320557a54a0e83d24ac4e5.mockapi.io/todos";

  return useMutation((id) => {
    api.delete(`${baseUrl}/${id}`);
  });
};
