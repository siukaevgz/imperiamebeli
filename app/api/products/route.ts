import prisma from "@/prisma/prisma-client";


import { NextRequest, NextResponse } from "next/server";

//Получение данных из базы
export async function GET(req:NextRequest) {
  const pageNumber = Number(req.nextUrl.searchParams.get("query"));
  const category = Number(req.nextUrl.searchParams.get("category"));
  const categoryChild = Number(req.nextUrl.searchParams.get("categoryChild"));
  const categoryChildChild = Number(req.nextUrl.searchParams.get("categoryChildChild"));

  const pageStart = (pageNumber*10)-10

  /////Если категории нет получаем все товары

  if(categoryChildChild){
    const product = await prisma.product.findMany({
      where:{
        categoryChildChildId:categoryChildChild,
       
      },
      skip: pageStart,
      take: 10,
      include: {
        photo: true,
      },
    });
    console.log('Не равен нулю')
    return NextResponse.json(product);
  }


  if(categoryChild){
    const product = await prisma.product.findMany({
      where:{
        categoryChildId:categoryChild,
       
      },
      skip: pageStart,
      take: 10,
      include: {
        photo: true,
      },
    });
    console.log('Не равен нулю')
    return NextResponse.json(product);
  }


if(category){
  const product = await prisma.product.findMany({
    where:{
      categoryId:category,
     
    },
    skip: pageStart,
    take: 10,
    include: {
      photo: true,
    },
  });
  console.log('Не равен нулю')
  return NextResponse.json(product);
}

const product = await prisma.product.findMany({
  skip: pageStart,
  take: 10,
  include: {
    photo: true,
  },
});
console.log('равен нулю')
return NextResponse.json(product);


/////Если категория есть то отдаем только то что необходимо
  
}

//Запись данных в базу
