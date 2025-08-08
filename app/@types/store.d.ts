import { productPhoto } from "@/prisma/constants";
import { Cart, CartItem, ProductPhoto, Product } from "@prisma/client";

type objType = {
  id?: number;
  userId?: number;
  token?: string;
  totalAmount: number;
  createAt?: string;
  updateAt?: string;
  items: {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    createAt: string;
    updateAt: string;
    product: {
      id: number;
      article?: string;
      name: string;
      price: number;
      categoryId: number;
      categoryChildId?: number;
      categoryChildChildId?: number;
      createAt: string;
      updateAt: string;
      photo: {
        id: number;
        productId: number;
        photoUrl: string;
        createAt: string;
        updateAt: string;
      }[];
    };
  }[];
};


type productObj = ({
  photo: {
    id: number;
    productId: number;
    photoUrl: string;
    createAt: Date;
    updateAt: Date;
  }[];
} & {
  id: number;
  article: number;
  name: string;
  price: number;
  categoryId: number | null;
  categoryChildId: number | null;
  categoryChildChildId: number | null;
  createAt: Date;
  updateAt: Date;
}) | null



type CategoryAll = ({
  categoryChild: ({
    categoryChildChild: {
      id: number;
      name: string;
      categoryChildId: number;
      createAt: Date;
      updateAt: Date;
    }[];
  } & {
    id: number;
    name: string;
    categoryId: number;
    createAt: Date;
    updateAt: Date;
  })[];
} & {
  id: number;
  name: string;
  photo: string;
  createAt: Date;
  updateAt: Date;
})[] | null




type search = {
  id: number;
  article: number;
  name: string;
  price: number;
  categoryId: number | null;
  categoryChildId: number | null;
  categoryChildChildId: number | null;
  createAt: Date;
  updateAt: Date;
  photo: {
    id: number;
    productId: number;
    photoUrl: string;
    createAt: Date;
    updateAt: Date;
  }[];
}[] | null