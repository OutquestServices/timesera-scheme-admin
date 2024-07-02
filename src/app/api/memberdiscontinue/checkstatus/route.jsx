"use server";

// pages/api/member/checkstatus.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  SchemesettlementSchema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function POST(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await SchemesettlementSchema(prisma);
    const body = await request.json();

    // Check if member exists
    const member = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT.findUnique({
      where: { CardNo: body.cardno },
    });

    if (!member) {
      return NextResponse.json({
        settled: false,
        discontinued: false,
      });
    }

    console.log(member);

    // Check the member's status (settled or discontinued)
    const isSettled = member.Settled || false;
    const isDiscontinued = member.Discontinue || false;

    return NextResponse.json({
      settled: isSettled,
      discontinued: isDiscontinued,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      body: { error: "Internal server error" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
