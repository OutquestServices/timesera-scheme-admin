"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
  const prisma = new PrismaClient();
  const body = await request.json();
  try {
    const member = await prisma.oRIGIN_SCHEME_USER.findUnique({
      where: {
        CardNo: body.cardno,
      },
    });

    if (!member) {
      return NextResponse.error({
        status: 404,
        body: { error: "Member not found" },
      });
    }
    const scheme = await prisma.oRIGIN_SCHEME_NAME.findUnique({
      where: {
        SchemeCode: member?.SchemeCode,
      },
    });

    const receipt = await prisma.oRIGIN_SCHEME_RECEIPT.findMany({
      where: {
        CardNo: body.cardno,
      },
    });

    const settlement = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT.findUnique({
      where: {
        CardNo: body.cardno,
      },
    });

    return NextResponse.json({ member, scheme, receipt, settlement });
  } catch (error) {
    return NextResponse.error({
      status: 400,
      body: { error: error.message },
    });
  } finally {
    await prisma.$disconnect();
  }
}

// Path: src/app/api/schememember/fetchmember/route.jsx

// {
//     cardno: "1234567890"
// }
