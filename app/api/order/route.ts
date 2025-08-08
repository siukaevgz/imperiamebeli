import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

//Получение данных из базы
export async function GET() {
  const order = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: {
            include: {
              photo: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(order);
}
