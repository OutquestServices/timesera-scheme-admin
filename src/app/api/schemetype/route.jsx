"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
  const prisma = new PrismaClient();
  try {
    const body = await request.json();

    const isExist = await prisma.oRIGIN_SCHEMETYPE.findUnique({
      where: { SchemeType: body.type },
    });

    if (!isExist) {
      const result = await prisma.oRIGIN_SCHEMETYPE.create({
        data: {
          SchemeType: body.type,
          SchemeMode: body.mode,
        },
      });
      return NextResponse.json({ message: result });
    }
    return NextResponse.error({
      status: 400,
      body: { error: "Scheme Code already exist" },
    });
  } catch (error) {
    return NextResponse.error({
      status: 400,
      body: { error: error.message },
    });
  } finally {
    await prisma.$disconnect();
  }
}

// Default export for endpoint
// {
//     "type": "hcfeythdg",
//     "mode": "gsregfyuhg",
//     "code": "yftvgfsathsjyfhg",
// }
