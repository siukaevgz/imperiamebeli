import { create } from "zustand";

interface State {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

export const usePaginationStore = create<State>()((set) => ({
  pageNumber: 1,
  setPageNumber: (pageNumber: number) => set({ pageNumber }),
}));
