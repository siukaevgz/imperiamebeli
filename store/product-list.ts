import { create } from "zustand";
import { theProducts } from "@/services/products";

interface State {
  products: theProducts[];
  setProducts: (products: theProducts[]) => void;
}

export const useProductsStore = create<State>()((set) => ({
    products: [],
    setProducts: (products: theProducts[]) => set({ products }),
}));
