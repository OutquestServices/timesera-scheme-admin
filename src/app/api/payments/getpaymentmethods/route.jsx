"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  OnlinemodeSchema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function GET(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await OnlinemodeSchema(prisma);
    const paymentmethods = await prisma.oNLINEMODE_MAST.findMany({});
    return NextResponse.json(paymentmethods);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  } finally {
    prisma.$disconnect();
  }
}
