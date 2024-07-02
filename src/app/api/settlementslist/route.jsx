"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  SchemesettlementSchema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function GET(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await SchemesettlementSchema(prisma);
    const settlements = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT.findMany({
      where: {
        Settled: true,
      },
    });

    return NextResponse.json(settlements);
  } catch (error) {
    return NextResponse.error({
      status: 400,
      body: { error: error.message },
    });
  } finally {
    await prisma.$disconnect();
  }
}
