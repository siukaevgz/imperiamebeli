"use client";
import React from "react";
import { cn } from "../../lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { Api } from "@/services/api-client";
import { Button } from "../ui";
import Link from "next/link";

interface Props {
  className?: string;
  children: any;
}

export const Sheets: React.FC<Props> = ({ children, className }) => {
  const setCartObj = useCartStore((state) => state.setCartObj);
  const cartObj = useCartStore((state) => state.cartObj);
  React.useEffect(() => {
    console.log(cartObj);
  }, [cartObj]);

  const [loading, setLoading] = React.useState(false);

  const addProduct = async (id: number) => {
    setLoading(true);
    toast("Товар добавлен в корзину.");
    Api.cart.addProduct(id).then((resp) => {
      setCartObj(resp);
      console.log(cartObj);
      setLoading(false);
    });
  };

  const dellProduct = async (id: number) => {
    setLoading(true);
    toast("Товар удален из корзины.");
    Api.cart.dellProduct(id).then((resp) => {
      setCartObj(resp);
      console.log(cartObj);
      setLoading(false);
    });
  };

  const dellCartAll = async (id: number) => {
    setLoading(true);
    toast("Товар удален из корзины.");
    Api.cart.dellCartAll(id).then((resp) => {
      setCartObj(resp);
      console.log(cartObj);
      setLoading(false);
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0 h-full">
        <SheetHeader>
          <SheetTitle className="p-4">
            В корзине{" "}
            <span className="font-bold">
              {cartObj && cartObj.totalAmount > 0 ? cartObj.items.length : 0} товара
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-x-auto h-[80%]">
          {cartObj && cartObj.totalAmount > 0 ? (
            cartObj?.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 w-full items-center mb-2 "
              >
                <div>
                  {item.product.photo.length != 0 ? (
                    <img
                      src={item.product.photo[0].photoUrl}
                      alt={item.product.name}
                      className="w-[45px] h-[45px]"
                    />
                  ) : (
                    <img
                      src={process.env.NEXT_PUBLIC_URL + "/image-none.svg"}
                      alt={item.product.name}
                      className="w-[45px] h-[45px]"
                    />
                  )}
                </div>
                <div className="w-full relative">
                  <X
                    onClick={() => dellCartAll(item.product.id)}
                    className="hover:bg-gray-300 rounded hover:text-white hover:cursor-pointer absolute top-0 right-0 w-[20px] h-[20px]"
                  />
                  <div className="font-bold">{item.product.name}</div>
                  <div className="text-sm font-light text-gray-500">
                    арт.{item.product.article}
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2 mt-4">
                      <Button className="w-[25px] h-[25px] p-0  bg-slate-600 hover:bg-slate-800">
                        <Minus
                          onClick={() => dellProduct(item.product.id)}
                          className="w-[20px]"
                        />
                      </Button>
                      <div className="flex text-xl items-center font-bold">
                        {item.quantity}
                      </div>
                      <Button className="w-[25px] h-[25px] p-0 bg-slate-600 hover:bg-slate-800">
                        <Plus
                          className="w-[20px]"
                          onClick={() => addProduct(item.product.id)}
                        />
                      </Button>
                    </div>
                    <div className="font-bold h">
                      {item.product.price * item.quantity} ₽
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full w-full justify-center items-center">
              <img
                src={process.env.NEXT_PUBLIC_URL + "/corz.png"}
                alt="Корзина пуста"
                width={200}
              />
            </div>
          )}
        </div>
        {cartObj && cartObj.totalAmount > 0 ? (
          <SheetFooter className="bg-gray-100 h-[20%]">
            <div className="flex flex-col w-full h-full justify-center gap-4 pb-12 pl-4 pr-4">
              <div className="flex w-full justify-between items-center">
                <div className="font-bold text-2xl">Итог</div>

                <div className="font-bold text-2xl">
                  {cartObj?.totalAmount} ₽
                </div>
              </div>
              <a href="/offer" className="w-full">
                <Button className="text-lg p-6 w-full">Оформить заказ</Button>
              </a>
            </div>
          </SheetFooter>
        ) : (
          ""
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Sheets;
