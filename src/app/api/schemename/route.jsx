"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
  const prisma = new PrismaClient();
  try {
    const body = await request.json();

    const isExist = await prisma.oRIGIN_SCHEMETYPE.findUnique({
      where: { SchemeCode: body.code },
    });

    if (isExist) {
      const result = await prisma.oRIGIN_SCHEME_NAME.create({
        data: {
          SchemeName: body.mode,
          SchemeCode: body.code,
          SchemeType: body.type,
          SchemeAmount: 123,
          SchemeDuration: 4653246,
          SchemePersons: 10,
          BonusMonth: 1,
          BonusAmount: 1000,
          SchemeValue: 10000,
          Commper: 10,
          Commamt: 1000,
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
//     "samount": 123,
//     "sduration": 12,
//     "spersons": 10,
//     "bmonth": 1,
//     "bamount": 1000,
//     "svalue": 100000,
//     "commper": 10,
//     "commamt": 1000
// }