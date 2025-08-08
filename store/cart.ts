import { objType } from "@/app/@types/store";
import { create } from "zustand";

interface State {
  cartObj: objType;
  setCartObj: (cartObj: objType) => void;
}

export const useCartStore = create<State>()((set) => ({
  cartObj: {
    totalAmount: 0,
    items:[]
  },
  setCartObj: (cartObj: objType) => set({ cartObj }),
}));
