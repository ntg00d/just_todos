import { useEffect } from "react";
import { useBaseQuery } from "./useBaseQuery";

export const useTodosQuery = () => {
  const url = "https://63320557a54a0e83d24ac4e5.mockapi.io/todos";
  const { data, isLoading, isError, fetchData } = useBaseQuery();

  useEffect(() => {
    fetchData(url);
  }, [fetchData]);

  return {
    data,
    isLoading,
    isError,
    refetchData: () => {
      fetchData(url);
      console.log("refetchData");
    },
    url,
  };
};
