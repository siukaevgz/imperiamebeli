import { TorderShema } from "@/checkout/orderShema";
import { axiosInstance } from "./axiosInstance";



export const sendOrder = async (datafile: TorderShema) => {
  const { data } = await axiosInstance.post<Number>("/cart/order", {
    datafile,
  });
  return data;
};
