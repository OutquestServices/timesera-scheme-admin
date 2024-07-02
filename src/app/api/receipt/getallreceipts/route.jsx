"use server";

import {
  ReceiptSchema,
  getPrismaClient,
} from "@/components/db/Connection";
// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await ReceiptSchema(prisma);
    const receipts = await prisma.oRIGIN_SCHEME_RECEIPT.findMany();
    return NextResponse.json(receipts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
