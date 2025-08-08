import { CategoryAll } from "@/app/@types/store";
import { axiosInstance } from "./axiosInstance";
import {
  Category,
  CategoryChild,
  CategoryChildChild,
  ProductPhoto,
} from "@prisma/client";

interface photoArray {
  id: number;
  photoUrl: string;
}

interface Product {
  id: number;
  article: number;
  name: string;
  price: number;
  photo: photoArray[];
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  token: string;
  userId?: number;
  items: OrderItem[];
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  totalAmount: number;
  createAt: string; // В формате ISO
  updateAt: string; // В формате ISO
}

export const getOrders = async () => {
  const { data } = await axiosInstance.get<Order[]>("/order/");
  return data;
};
