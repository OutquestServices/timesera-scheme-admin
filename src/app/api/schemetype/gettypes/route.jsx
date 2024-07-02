"use server";

import {
  SchemetypeSchema,
  getPrismaClient,
} from "@/components/db/Connection";
// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await SchemetypeSchema(prisma);
    const schemtypes = await prisma.oRIGIN_SCHEMETYPE.findMany({});
    return NextResponse.json(schemtypes);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
