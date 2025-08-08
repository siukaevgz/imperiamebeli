import { Product, ProductPhoto } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { productObj } from "@/app/@types/store";

export const getProduct = async (id: number) => {
    const { data } = await axiosInstance.post<productObj>("/product", {
      productId: id,
    }
    );
    return data;
  };
