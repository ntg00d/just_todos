import { useTodosQuery } from "./useTodosQuery";

export const useAddTodoMutation = () => {
  const { refetchData, url } = useTodosQuery();

  return async (newTodoText) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ text: newTodoText }),
    });

    refetchData();
  };
};
