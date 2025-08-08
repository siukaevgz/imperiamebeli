import { objType, productObj } from "@/app/@types/store";
import { create } from "zustand";

interface State {
    productObj: productObj;
  setProductObj: (productObj: productObj) => void;
}

export const useProductStore = create<State>()((set) => ({
    productObj: null,
  setProductObj: (productObj: productObj) => set({ productObj }),
}));
