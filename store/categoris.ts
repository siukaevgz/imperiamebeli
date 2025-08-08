import { Category, CategoryChild, CategoryChildChild } from "@prisma/client";
import { create } from "zustand";

interface State {
  categoryObj: {
    category?: Category;
    categoryChild?: CategoryChild;
    categoryChildChild?: CategoryChildChild;
  };
  setCategoryObj: (categoryObj: {
    category?: Category;
    categoryChild?: CategoryChild;
    categoryChildChild?: CategoryChildChild;
  }) => void;
}

export const useCategoryStore = create<State>()((set) => ({
  categoryObj: {},
  setCategoryObj: (categoryObj: {
    category?: Category;
    categoryChild?: CategoryChild;
    categoryChildChild?: CategoryChildChild;
  }) => set({ categoryObj }),
}));
