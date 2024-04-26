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
          SchemeName: body.sname,
          SchemeCode: isExist.SchemeCode,
          SchemeType: isExist.SchemeType,
          SchemeAmount: body.samount,
          SchemeDuration: body.sduration,
          SchemePersons: body.spersons,
          BonusMonth: body.bmonth,
          BonusAmount: body.bamount,
          SchemeValue: body.svalue,
          Commper: body.commper,
          Commamt: body.commamt,
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
//     "code": "yftvgfsathsjyfhg",
//     "sname": "gsregfyuhg",
//     "samount": 123,
//     "sduration": 12,
//     "spersons": 10,
//     "bmonth": 1,
//     "bamount": 1000,
//     "svalue": 100000,
//     "commper": 10,
//     "commamt": 1000
// }