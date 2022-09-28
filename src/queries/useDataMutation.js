export const useDataMutation = () => {
  return async (method, url, body) => {
    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
  };
};
