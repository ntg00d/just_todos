import { useCallback, useEffect, useState } from "react";

export const useDataQuery = (url, params) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  // const debounced = useDebounce(params.search, 200);

  // const queryParams = {
  //   ...params,
  //   search: debounced,
  // };

  const refetch = useCallback(() => {
    setIsError(undefined);
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(url);
        setData(await response.json());
        setIsLoading(false);
      }, 1500); // Нюанс с беком
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
