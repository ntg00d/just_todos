import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { useDebounce } from "../hooks";

export const useGetTodosQuery = (params) => {
  const baseUrl = "https://63320557a54a0e83d24ac4e5.mockapi.io/todos";
  const debounced = useDebounce(params.search, 200);

  const queryParams = {
    ...params,
    search: debounced,
  };

  return useQuery(["useFetchTodosQuery", queryParams], async () => {
    try {
      const response = await api.get(
        `${baseUrl}?search=${queryParams.search}`,
        queryParams
      );

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  });
};
