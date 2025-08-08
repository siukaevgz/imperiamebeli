import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  let token = user?.token;
  if (!token) {
    ////Генерируем новый токен если его еще нет
    token = crypto.randomUUID();

    /////Создали и сохранили токен у пользователя
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        token: token,
      },
    });

    ////Создали корзину польззователю
    await prisma.cart.create({
      data: {
        token: token,
      },
    });
  }

  const resp = NextResponse.json(token);
  resp.cookies.set("cartToken", token);
  return resp;
}
