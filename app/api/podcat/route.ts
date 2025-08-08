import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";



//Получение данных из базы
export async function GET(req: NextRequest) {

    const categoryId = req.nextUrl.searchParams.get("categoryId")
    const categoryChildId = req.nextUrl.searchParams.get("categoryChildId")
    if (categoryChildId) {
        const category = await prisma.categoryChildChild.findMany({
            where: {
                categoryChildId: Number(categoryChildId)
            }
        });
        return NextResponse.json(category)
    }
    if (categoryId) {
        const category = await prisma.categoryChild.findMany({
            where: {
                categoryId: Number(categoryId)
            }
        });
        return NextResponse.json(category)
    }

}