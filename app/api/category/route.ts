import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";



//Получение данных из базы
export async function GET(){

const category = await prisma.category.findMany();
return NextResponse.json(category)
}


//Запись данных в базу
export async function POST(req:NextRequest){
const body = await req.json()

const category = prisma.category.create({data:body})

return NextResponse.json(category)
}