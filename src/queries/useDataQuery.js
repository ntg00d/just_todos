import { useCallback, useEffect, useState } from "react";
import { api } from "../api";

export const useDataQuery = (url, params) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  // const debounced = useDebounce(params.search, 200);

  // const queryParams = useCallback(() => {
  //   return {
  //     ...params,
  //     search: debounced,
  //   };
  // }, [params, debounced]);

  const refetch = useCallback(async () => {
    setIsError(undefined);
    setIsLoading(true);

    try {
      const response = await api.get(url);
      setData(await response.json());
      setIsLoading(false);
    } catch (err) {
      console.log(err);

      setIsError(err?.response?.data);
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    isLoading,
    isError,
    data,
    refetch,
  };
};
