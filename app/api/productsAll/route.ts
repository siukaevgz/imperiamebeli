import prisma from "@/prisma/prisma-client";


import { NextRequest, NextResponse } from "next/server";

//Получение данных из базы
export async function GET(req: NextRequest) {

    const category = Number(req.nextUrl.searchParams.get("category"));
    const categoryChild = Number(req.nextUrl.searchParams.get("categoryChild"));
    const categoryChildChild = Number(req.nextUrl.searchParams.get("categoryChildChild"));



    /////Если категории нет получаем все товары

    if (categoryChildChild) {
        const product = await prisma.product.findMany({
            where: {
                categoryChildChildId: categoryChildChild,

            },
            include: {
                photo: true,
            },
        });
        console.log('Не равен нулю')
        return NextResponse.json(product);
    }


    if (categoryChild) {
        const product = await prisma.product.findMany({
            where: {
                categoryChildId: categoryChild,

            },
            include: {
                photo: true,
            },
        });
        console.log('Не равен нулю')
        return NextResponse.json(product);
    }


    if (category) {
        const product = await prisma.product.findMany({
            where: {
                categoryId: category,

            },
            include: {
                photo: true,
            },
        });
        console.log('Не равен нулю')
        return NextResponse.json(product);
    }

    const product = await prisma.product.findMany({

        include: {
            photo: true,
        },
    });

    return NextResponse.json(product);


    /////Если категория есть то отдаем только то что необходимо

}

//Запись данных в базу
