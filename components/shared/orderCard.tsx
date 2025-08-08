"use client";
import React, { useState } from "react";
import { Send, X } from "lucide-react";
import { ProductPhoto } from "@prisma/client";

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

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Определяем отображаемые продукты
  const displayedItems = isExpanded ? order.items : order.items.slice(0, 3);

  console.log(displayedItems);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Заказ #{order.id}</h2>
      <p className="text-gray-600">
        Дата: {new Date(order.createAt).toLocaleDateString()}
      </p>
      <p className="text-gray-600">
        Имя: {order.name} {order.surname}
      </p>
      <p className="text-gray-600">Email: {order.email}</p>
      <p className="text-gray-600">Телефон: {order.phone}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">Список товаров:</h3>
      <ul
        className={`space-y-4 ${
          isExpanded ? "max-h-full" : "max-h-64 overflow-hidden"
        } transition-all duration-300`}
      >
        {displayedItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center">
              {item.product.photo?.length !== 0 ? (
                <img
                  src={item.product.photo[0].photoUrl}
                  alt={item.product.name}
                  className="h-12 w-12 object-cover mr-3"
                />
              ) : (
                <img
                  src={process.env.NEXT_PUBLIC_URL + "/image-none.svg"}
                  alt={item.product.name}
                  className="h-12 w-12 object-cover mr-3"
                />
              )}

              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-gray-600">Количество: {item.quantity}</p>
                <p className="text-gray-600">
                  Цена: ₽{item.product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {order.items.length > 3 && (
        <button onClick={toggleExpand} className="text-blue-500 mt-2">
          {isExpanded ? "Скрыть" : "Раскрыть"}
        </button>
      )}

      <div className="mt-4">
        <p className="font-semibold text-lg">
          Общая сумма: ₽{order.totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 flex items-center">
          <Send className="mr-2" /> Отправить заказ
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 flex items-center">
          <X className="mr-2" /> Отменить заказ
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
