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
}

export const HeaderAdmin: React.FC<Props> = ({ className }) => {
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

        <div className="flex flex-row gap-4">
          <ButtonAuth />
        </div>
      </Container>
    </header>
  );
};

export default HeaderAdmin;
