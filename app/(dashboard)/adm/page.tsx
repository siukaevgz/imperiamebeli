"use client";
import { Container } from "@/components/shared";
import OrderCard from "@/components/shared/orderCard";
import { Api } from "@/services/api-client";

import React from "react";

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

const HomePage: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[]>();

  React.useEffect(() => {
    Api.orders.getOrders().then((item) => setOrders(item));
  }, []);
  return (
    <Container>
      {orders && orders.map((item) => <OrderCard order={item} key={item.id} />)}
    </Container>
  );
};

export default HomePage;
