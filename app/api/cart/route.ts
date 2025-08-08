import { findOrCreateCart } from "@/lib/findOrCreateCart";
import { updateTotalAmountCart } from "@/lib/updateTotalAmountCart";
import prisma from "@/prisma/prisma-client";

import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
  let token = req.cookies.get("cartToken")?.value;
  const data = Number(req.nextUrl.searchParams.get("del_id"))

  if (!token) {
    token = crypto.randomUUID();
  }

  const userCart = await findOrCreateCart(token);

  const cartItems = await prisma.cartItem.findFirst({
    where: {
      cartId: userCart.id,
      productId: data,
    },
  });

  ///Если товар есть то просто увеличиваем количество
  if (cartItems) {
    ////Если остался последний товар то удаляем его из корзины
    if (cartItems.quantity == 1) {
      await prisma.cartItem.delete({
        where: {
          cartId: userCart.id,
          id: cartItems.id,
        },
      })
    }
    ////Если больше одного то уменьшаем на один 
    if (cartItems.quantity > 1) {
      await prisma.cartItem.update({
        where: {
          cartId: userCart.id,
          id: cartItems.id,
        },
        data: {
          quantity: cartItems.quantity - 1,
        },
      });
    }

  } else {
    /////Если товара нет то ничего не делаем

  }

  const cartActual = await updateTotalAmountCart(token);
  const resp = NextResponse.json(cartActual);
  resp.cookies.set("cartToken", token);
  return resp;
}


///////////////////////////////



export async function POST(req: NextRequest) {
  let token = req.cookies.get("cartToken")?.value;

  const data = await req.json();
  if (!token) {
    token = crypto.randomUUID();
  }

  const userCart = await findOrCreateCart(token);

  const cartItems = await prisma.cartItem.findFirst({
    where: {
      cartId: userCart.id,
      productId: data.productId,
    },
  });

  ///Если товар есть то просто увеличиваем количество
  if (cartItems) {
    await prisma.cartItem.update({
      where: {
        id: cartItems.id,
      },
      data: {
        quantity: cartItems.quantity + 1,
      },
    });
  } else {
    /////Если товара нет то создаем его
    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productId: data.productId,
        quantity: 1,
      },
    });
  }

  const cartActual = await updateTotalAmountCart(token);
  const resp = NextResponse.json(cartActual);
  resp.cookies.set("cartToken", token);
  return resp;
}
