"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  SchemesettlementSchema,
  Schemeuserschema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function POST(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await Schemeuserschema(prisma);
    await SchemesettlementSchema(prisma);
    const body = await request.json();

    const isExist = await prisma.oRIGIN_SCHEME_USER.findUnique({
      where: {
        CardNo: body.cardno,
      },
    });

    console.log("Exist data: " + isExist);

    if (isExist) {
      const result = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT.create({
        data: {
          SchemeType: isExist.SchemeType,
          SchemeName: isExist.SchemeName,
          CardNo: isExist.CardNo,
          MemberName: body.membername,
          MobileNo: body.mobileno,
          SchemeAmount: body.schemeamount,
          PaidAmount: body.paidamount,
          BalanceAmount: body.balanceamount,
          GoldWt: body.goldwt,
          GoldAmt: body.goldamt,
          Settled: body.settled,
          Discontinue: body.discontinue,
          Description: body.description,
          Date: body.date,
          VoucherNo: body.voucherNo,
        },
      });

      return NextResponse.json({ message: "Discontinued Successfully" });
    }
  } catch (error) {
    return NextResponse.error({
      status: 400,
      body: { error: error.message },
    });
  } finally {
    await prisma.$disconnect();
  }
}
