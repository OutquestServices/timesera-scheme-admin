"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
  const prisma = new PrismaClient();
  try {
    const body = await request.json();

    const isExist = await prisma.oRIGIN_SCHEME_NAME.findUnique({
      where: { SchemeCode: body.code },
    });

    if (isExist) {
      const result = await prisma.oRIGIN_SCHEME_RECEIPT.create({
        data: {
          SchemeName: isExist.SchemeName,
          SchemeCode: isExist.SchemeCode,
          SchemeType: isExist.SchemeType,
          ReceiptNo: body.rno,
          ReceiptDate: body.rdate,
          CardNo: body.cardno,
          MobileNo: body.mno,
          MemberName: body.mname,
          Address: body.address,
          CollectionPoint: body.cpoint,
          PaymentMode: body.pmode,
          AccNo: body.accno,
          Description: body.desc,
          Amount: body.amount,
          GoldAmount: body.gamount,
          GoldWt: body.gweight,
          Incharge: body.incharge,
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
//     "cardno": "1234567890",
//     "rno": "123",
//     "rdate": "2021-09-01",
//     "mno": "1234567890",
//     "mname": "Test",
//     "address": "Test",
//     "cpoint": "Test",
//     "pmode": "Test",
//     "accno": "Test",
//     "desc": "Test",
//     "amount": 1000,
//     "gamount": 1000,
//     "incharge": "Test",
//     "gweight": 1000,
// }
