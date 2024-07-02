"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  Schemeuserschema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function GET(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await Schemeuserschema(prisma);
    const schememembers = await prisma.oRIGIN_SCHEME_USER.findMany({});
    return NextResponse.json(schememembers);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  } finally {
    prisma.$disconnect();
  }
}
