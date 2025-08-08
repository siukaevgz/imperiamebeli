import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

//Получение данных из базы
export async function GET(req: NextRequest) {
  const search_string = req.nextUrl.searchParams.get("search_string") as string;

  const product = await prisma.product.findMany({
    skip: 0,
    take: 5,
    where: {
      name: {
        search: "*" + search_string + "*",
      },
    },
    include: {
      photo: true,
    },
  });

  if (!product) {
    return NextResponse.json(null);
  }

  return NextResponse.json(product);
}
