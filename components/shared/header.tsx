"use client";
import React from "react";
import { cn } from "../../lib/utils";
import Container from "./container";
import { Button } from "../ui";
import { AlignJustify, ArrowRight, ShoppingCart, User } from "lucide-react";
import SearchInput from "./search-input";
import ButtonAuth from "./button-auth";
import Link from "next/link";
import Sheets from "./sheets";
import { useCartStore } from "@/store/cart";
import { updateTotalAmountCart } from "@/lib/updateTotalAmountCart";
import { getCookie } from "cookies-next";
import { Api } from "@/services/api-client";

interface Props {
  className?: string;
  offer?: boolean;
}

export const Header: React.FC<Props> = ({ className, offer }) => {
  const setCartObj = useCartStore((state) => state.setCartObj);
  const cartObj = useCartStore((state) => state.cartObj);
  React.useEffect(() => {
    Api.cart.getCart().then((resp) => {
      setCartObj(resp);
      console.log(cartObj);
    });
  }, []);
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="font-extrabold text-lg">
            <p>INDUSTRIA</p>
            <p>MEBELI.RU</p>
          </div>
        </Link>
        {offer ? (
          ""
        ) : (
          <>

            <SearchInput />
          </>
        )}


        <div className="flex flex-row gap-4">
          <ButtonAuth />

          {offer ? (
            ""
          ) : (
            <div>
              <Sheets>
                <Button className="group relative">
                  <p>{cartObj && cartObj.totalAmount > 0 ? cartObj.totalAmount : 0} ₽</p>
                  <span className="h-full w-[1px] bg-white/30 mx-3"></span>
                  <div className="flex items-center gap-3 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart
                      className="h-4 w-4 relative"
                      strokeWidth={2}
                    />
                    <p>{cartObj && cartObj.totalAmount > 0 ? cartObj.items.length : 0}</p>
                  </div>
                  <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </Button>
              </Sheets>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
