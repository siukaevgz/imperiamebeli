import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";



//Получение данных из базы
export async function GET() {

    const category = await prisma.category.findMany(
        {
            include: {
                categoryChild: {
                    include: {
                        categoryChildChild: true
                    }
                }
            }
        }
    );
    return NextResponse.json(category)
}