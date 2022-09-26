import { useCallback, useEffect, useState } from "react";

export const useBaseQuery = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(
    async (url) => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const jsonData = await response.json();

        setData(jsonData);
        setIsLoading(false);
        setIsError(false);

        console.log("useBaseQuery -> useCallback -> fetchData");
      } catch {
        setIsLoading(false);
        setIsError(true);
      }
    },
    [setData, setIsLoading, setIsError]
  );

  useEffect(() => {
    fetchData();

    console.log("useBaseQuery -> useEffect -> fetchData");
  }, [fetchData]);

  return {
    data,
    isLoading,
    isError,
    fetchData,
  };
};
