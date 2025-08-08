import { findOrCreateCart } from "@/lib/findOrCreateCart";
import { updateTotalAmountCart } from "@/lib/updateTotalAmountCart";
import prisma from "@/prisma/prisma-client";

import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let token = req.cookies.get("cartToken")?.value;

  if (!token) {
    return NextResponse.json("");
  }

  const cartActual = await updateTotalAmountCart(token);
  const resp = NextResponse.json(cartActual);
  resp.cookies.set("cartToken", token);
  return resp;
}


