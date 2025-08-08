import { axiosInstance } from "./axiosInstance"
import {Category, CategoryChild, CategoryChildChild} from "@prisma/client";


export const getCategory = async(categoryId?:Number)=>{
     const {data} = await axiosInstance.get<Category>('/breadcrumb/?categoryId='+categoryId);
     return data
}


export const getCategoryChild = async(categoryChildId?:Number)=>{
    const {data} = await axiosInstance.get<CategoryChild>('/breadcrumb/?categoryChildId='+categoryChildId);
     return data
}

export const getCategoryChildChild = async(categoryChildChildId?:Number)=>{
     const {data} = await axiosInstance.get<CategoryChildChild>('/breadcrumb/?categoryChildChildId='+categoryChildChildId);
     return data
}