import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

//Получение данных из базы
export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.get("categoryId");
  const categoryChildId = req.nextUrl.searchParams.get("categoryChildId");
  const categoryChildChildId = req.nextUrl.searchParams.get(
    "categoryChildChildId"
  );

  if (categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: Number(categoryId),
      },
    });

    return NextResponse.json(category);
  }

  if (categoryChildId) {
    const categoryChild = await prisma.categoryChild.findFirst({
      where: {
        id: Number(categoryChildId),
      },
    });

    return NextResponse.json(categoryChild);
  }

  if (categoryChildChildId) {
    const categoryChildChild = await prisma.categoryChildChild.findFirst({
      where: {
        id: Number(categoryChildChildId),
      },
    });

    return NextResponse.json(categoryChildChild);
  }
}
