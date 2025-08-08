'use client'
import React from "react";
import { cn } from "../../lib/utils";
import { theProducts } from "@/services/products";
import { Button } from "../ui";
import { Api } from "@/services/api-client";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cart";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

interface Props {
  className?: string;
  items: theProducts;
}

export const Product: React.FC<Props> = ({ className, items }) => {
  const setCartObj = useCartStore((state) => state.setCartObj);
  const cartObj = useCartStore((state) => state.cartObj);

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

  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });
  ///////////import { useMediaQuery } from "react-responsive";
  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);
  return (
    <div
      key={items.id}
      className="flex flex-col w-full h-full justify-between hover:cursor-pointer"
    >
      <Link
        href={"/productInfo/" + items.id}
        className="flex w-full justify-center items-center mb-5"
      >
        {items.photo.length !== 0 ? (
          <img
            src={items.photo[0]?.photoUrl}
            alt={items.name}
            className="w-[200px] h-[200px]"
          />
        ) : (
          <img
            src={process.env.NEXT_PUBLIC_URL + "/image-none.svg"}
            alt={items.name}
            className="w-[200px] h-[200px]"
          />
        )}
      </Link>
      <div>
        <div className="text-xs text-gray-400">{"Арт." + items.article}</div>
        <div className="mb-4 text-sm"> {items.name}</div>

        <div className="flex justify-between">
          <div className="flex justify-start items-start gap-2 mb-4">
            <div className="text-xl font-extrabold">{items.price}</div>
            <div>₽/шт</div>
          </div>
          <Button
            onClick={() => addProduct(items.id)}
            className="text-sm w-[114px] h-[36px] items-center font-bold bg-gray-800 hover:bg-black"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div>В КОРЗИНУ</div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
