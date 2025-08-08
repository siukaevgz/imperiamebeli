import { findOrCreateCart } from "@/lib/findOrCreateCart";
import { updateTotalAmountCart } from "@/lib/updateTotalAmountCart";
import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    

    const data = await req.json();
   
const product = await prisma.product.findFirst({
    where:{
        id:data.productId
    },
    include:{
        photo:true
    }
})
    



    



    const resp = NextResponse.json(product);
 
    return resp;
}