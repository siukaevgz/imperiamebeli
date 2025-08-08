import { findOrCreateCart } from "@/lib/findOrCreateCart";
import { updateTotalAmountCart } from "@/lib/updateTotalAmountCart";
import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

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

    if (cartItems) {
        await prisma.cartItem.delete({
            where: {
                id: cartItems.id,
            },
        })
    }


    const cartActual = await updateTotalAmountCart(token);
    const resp = NextResponse.json(cartActual);
    resp.cookies.set("cartToken", token);
    return resp;
}