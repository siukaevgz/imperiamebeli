import { TorderShema } from "@/checkout/orderShema";
import { axiosInstance } from "./axiosInstance";
import { search } from "@/app/@types/store";




export const sendSearch = async (search_string: string) => {
    const { data } = await axiosInstance.get<search>("/search/?search_string=" + search_string);
    return data;
};
