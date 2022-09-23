import create from "zustand";

const useTodosStore = create(() => ({
  todos: [
    { id: "1", text: "one", liked: false },
    { id: "2", text: "two", liked: false },
    { id: "3", text: "three", liked: false },
  ],
}));

export default useTodosStore;
