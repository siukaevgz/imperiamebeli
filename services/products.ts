import { axiosInstance } from "./axiosInstance";
import { Product, ProductPhoto } from "@prisma/client";

export type theProducts = Product & {
  photo: ProductPhoto[];
};



export const getProducts = async (pageNumber: number, categoryId?: Number, categoryChildId?: Number, categoryChildChildId?: Number) => {

  const { data } = await axiosInstance.get<theProducts[]>("/products?query=" + pageNumber + "&category=" + categoryId + "&categoryChild=" + categoryChildId + "&categoryChildChild=" + categoryChildChildId);
  return data;
};

export const getProductsAll = async (categoryId?: Number, categoryChildId?: Number, categoryChildChildId?: Number) => {

  const { data } = await axiosInstance.get<theProducts[]>("/productsAll?category=" + categoryId + "&categoryChild=" + categoryChildId + "&categoryChildChild=" + categoryChildChildId);
  return data;
};


export const getProductsCount = async (categoryId?: Number, categoryChildId?: Number, categoryChildChildId?: Number) => {
  const { data } = await axiosInstance.get<number>("/products/getCount/?category=" + categoryId + "&categoryChild=" + categoryChildId + "&categoryChildChild=" + categoryChildChildId);
  return data;
};
