import { CategoryAll } from "@/app/@types/store";
import { axiosInstance } from "./axiosInstance"
import { Category, CategoryChild, CategoryChildChild } from "@prisma/client";


export const getCategory = async () => {
     const { data } = await axiosInstance.get<Category[]>('/category/');
     return data
}

export const getCategoryAll = async () => {
     const { data } = await axiosInstance.get<CategoryAll>('/category/all');
     return data
}


export const getPodCategory = async (categoryId: Number) => {
     const { data } = await axiosInstance.get<CategoryChild[]>('/podcat/?categoryId=' + categoryId);
     return data
}

export const getPodPodCategory = async (categoryChildId?: Number) => {
     const { data } = await axiosInstance.get<CategoryChildChild[]>('/podcat/?categoryChildId=' + categoryChildId);
     return data
}