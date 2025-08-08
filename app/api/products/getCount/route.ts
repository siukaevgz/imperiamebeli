import prisma from "@/prisma/prisma-client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { NextRequest, NextResponse } from "next/server";

//*Получение данных из базы
//export async function GET(req: NextRequest) {
// const query = req.nextUrl.searchParams.get("query");
// return NextResponse.json(query);
//}


export async function GET(req:NextRequest) {

  const category = Number(req.nextUrl.searchParams.get("category"));
  const categoryChild = Number(req.nextUrl.searchParams.get("categoryChild"));
  const categoryChildChild = Number(req.nextUrl.searchParams.get("categoryChildChild"));

 
  if(categoryChildChild){
   
  const count = await prisma.product.count({
    where:{

      categoryChildChildId:categoryChildChild,
    
    }
  });
  const result = Math.ceil(count / 10);
  return NextResponse.json(result);
  }

  if(categoryChild){
   
    const count = await prisma.product.count({
      where:{
  
        categoryChildId:categoryChild,
      
      }
    });
    const result = Math.ceil(count / 10);
    return NextResponse.json(result);
    }


    if(category){
   
      const count = await prisma.product.count({
        where:{
    
          categoryId:category,
        
        }
      });
      const result = Math.ceil(count / 10);
      return NextResponse.json(result);
      }

  const count = await prisma.product.count();
    const result = Math.ceil(count / 10);
    console.log(count)
    return NextResponse.json(result);



  
}

//Запись данных в базу
