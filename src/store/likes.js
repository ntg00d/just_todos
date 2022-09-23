import create from "zustand";

export const useLikesStore = create(() => ({
  likedTodos: [],
}));
