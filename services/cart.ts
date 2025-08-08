import { objType } from "@/app/@types/store";
import { axiosInstance } from "./axiosInstance";

export const addProduct = async (id: number) => {
  const { data } = await axiosInstance.post<objType>("/cart", {
    productId: id,
  });
  return data;
};


export const dellProduct = async (id: number) => {
  const { data } = await axiosInstance.get<objType>("/cart/?del_id=" + id);
  return data;
};


export const dellCartAll = async (id: number) => {
  const { data } = await axiosInstance.post<objType>("/cart/dellCart", {
    productId: id,
  }
  );
  return data;
};

export const getCart = async () => {
  const { data } = await axiosInstance.post<objType>("/cart/token");
  return data;
};

