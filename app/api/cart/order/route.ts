import { TorderShema } from "@/checkout/orderShema";
import { findOrCreateCart } from "@/lib/findOrCreateCart";
import { updateTotalAmountCart } from "@/lib/updateTotalAmountCart";
import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let token = req.cookies.get("cartToken")?.value;

  const dataMain = await req.json();
  const data = dataMain.datafile as TorderShema;
  if (!token) {
    token = crypto.randomUUID();
  }

  const userCart = await findOrCreateCart(token);

  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: userCart.id,
    },
  });

  if (cartItems) {
    const orderRequest = await prisma.order.create({
      data: {
        token: token,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        totalAmount: userCart.totalAmount,
      },
    });

    try {
      if (orderRequest) {
        cartItems.map(async (item) => {
          await prisma.orderItem.create({
            data: {
              orderId: orderRequest.id,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        });
      }

      ////Очищаем корзину
      await prisma.cartItem.deleteMany({
        where:{
          cartId:userCart.id
        }
      })

      await prisma.cart.update({
        where:{
          id:userCart.id
        },
        data:{
          totalAmount:0
        }
      })


      
      const resp = NextResponse.json(orderRequest.id);
      resp.cookies.set("cartToken", token);
      return resp;
    } catch (error) {
      const resp = NextResponse.json(0);
      resp.cookies.set("cartToken", token);
      return resp;
    }
  }
}
