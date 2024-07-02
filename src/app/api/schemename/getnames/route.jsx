"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  SchemenameSchema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function GET(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await SchemenameSchema(prisma);
    const schemenames = await prisma.oRIGIN_SCHEME_NAME.findMany({});
    return NextResponse.json(schemenames);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  } finally {
    prisma.$disconnect();
  }
}
