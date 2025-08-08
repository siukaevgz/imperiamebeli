"use client";
import { Container, FormInput } from "@/components/shared";
import { Button } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Api } from "@/services/api-client";
import { useCartStore } from "@/store";
import { Loader2, Minus, Plus, X, Check, MoveLeft } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useForm, FormProvider } from "react-hook-form";

import { useFormState } from "react-dom";
import { orderShema, TorderShema } from "@/checkout/orderShema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { number } from "zod";
import { useMediaQuery } from "react-responsive";

export default function OfferPage() {
  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });

  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  const setCartObj = useCartStore((state) => state.setCartObj);
  const cartObj = useCartStore((state) => state.cartObj);

  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const [loadingButton, setLoadingButton] = React.useState(false);

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

  const form = useForm<TorderShema>({
    resolver: zodResolver(orderShema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: TorderShema) => {
    setLoadingButton(true);
    await Api.order.sendOrder(data).then((resp) => {
      console.log("Ответ после оформления заказа" + resp);
      if (Number(resp) > Number(0)) {
        setOrder(Number(resp));
        setOpen(true);
      }
    });
    console.log(data);
    setLoadingButton(false);
  };
  return open == false ? (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Container
          className={`flex justify-between ${isDesktop ? "" : "flex-col"}`}
        >
          <div className={` mt-10 ${isDesktop ? "w-1/2" : "w-full pl-2 pr-2"}`}>
            <div className="font-bold text-2xl">Оформление заказа</div>
            <div className="bg-white shadow-md rounded-xl p-4 w-full mt-10 border border-gray-300">
              <div className="font-bold text-lg">1. Корзина</div>
              {cartObj.totalAmount > 0 ? (
                cartObj?.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 w-full items-center mb-2 "
                  >
                    <div>
                      {item.product.photo.length !== 0 ? (
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
                          <div className="w-[25px] h-[25px] p-0  bg-slate-600 hover:bg-slate-800  flex justify-center hover:cursor-pointer items-center rounded-md">
                            <Minus
                              onClick={() => dellProduct(item.product.id)}
                              className="w-[20px]"
                            />
                          </div>
                          <div className="flex text-xl items-center font-bold">
                            {item.quantity}
                          </div>
                          <div className="w-[25px] h-[25px] p-0 bg-slate-600 flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-slate-800">
                            <Plus
                              className="w-[20px]"
                              onClick={() => addProduct(item.product.id)}
                            />
                          </div>
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

            <div className="bg-white shadow-md rounded-xl p-4 w-full mt-10 border border-gray-300">
              <div className="font-bold text-lg">2. Персональные данные</div>
              <div>
                <div
                  className={`flex justify-between ${
                    isDesktop ? "" : "flex-col"
                  }`}
                >
                  <FormInput
                    type="text"
                    name="name"
                    placeholder="Имя"
                    className={` ${isDesktop ? "" : "flex w-full"} `}
                  />
                  <FormInput
                    type="text"
                    name="surname"
                    placeholder="Фамилия"
                    className={` ${isDesktop ? "" : "flex w-full"} `}
                  />
                </div>
                <div
                  className={`flex justify-between ${
                    isDesktop ? "" : "flex-col"
                  }`}
                >
                  <FormInput
                    type="text"
                    name="email"
                    placeholder="Почта"
                    className={` ${isDesktop ? "" : "flex w-full"} `}
                  />
                  <FormInput
                    type="text"
                    name="phone"
                    placeholder="Телефон"
                    className={` ${isDesktop ? "" : "flex w-full"} `}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 w-full mt-10 border border-gray-300">
              <div className="font-bold text-lg">
                3. Способ получения товара
              </div>
              <div>Самовывоз по адресу: г. Владикавказ, ул. Кирова, дом.1 </div>
            </div>
          </div>
          <div
            className={`  ${
              isDesktop ? "w-[40%] mt-10" : "w-full pl-2 pr-2 mt-4 mb-4"
            }`}
          >
            <div className="bg-white shadow-md rounded-xl p-4 w-full mt-10 border border-gray-300">
              <div className="font-bold text-lg">Итого</div>
              <div>{cartObj.totalAmount > 0 ? cartObj.totalAmount : 0}₽</div>
              {loadingButton ? (
                <Button className="text-lg p-6 w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Заказ
                  создается...
                </Button>
              ) : (
                <Button className="text-lg p-6 w-full">Заказать</Button>
              )}
            </div>
          </div>
        </Container>
      </form>
    </FormProvider>
  ) : (
    <Container className="flex items-center justify-center">
      <div
        className={`shadow-2xl mt-20  rounded-md overflow-hidden  ${
          isDesktop ? "w-[300px] h-[300px]" : "w-full h-[300px] pr-2 pl-2"
        } `}
      >
        <div className="bg-green-500 flex items-center justify-center p-4">
          <Check color="#ffffff" width={50} height={50} />
        </div>

        <div className="p-4 text-gray-600 flex flex-col items-center justify-center">
          <div className="font-bold w-full">Заказ #{order}</div>
          <div className="w-full">
            Заказ принят в работу, в ближайшее время с вами свяжется наш
            менеджер.
          </div>
          <Link href="/">
            <Button className="mt-4 gap-2">
              <MoveLeft color="#ffffff" />
              Вернутся на главну
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
