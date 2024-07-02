"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  ReceiptSchema,
  Schemeuserschema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function POST(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await Schemeuserschema(prisma);
    await ReceiptSchema(prisma);
    const body = await request.json();
    console.log("Request body:", body);

    const isExist = await prisma.oRIGIN_SCHEME_USER.findUnique({
      where: {
        CardNo: body.cardno,
      },
    });

    if (isExist) {
      const nextDate = calculateNextDate(body.rdate, 1);
      const ActualDate = calculateNextDate(isExist.JoinDate, body.months + 1);

      await prisma.oRIGIN_SCHEME_USER.update({
        where: {
          CardNo: body.cardno,
        },
        data: {
          LastDatePaid: body.rdate,
          NextDateToPay: nextDate,
          ActualDateToPay: ActualDate,
        },
      });

      const result = await prisma.oRIGIN_SCHEME_RECEIPT.create({
        data: {
          SchemeName: isExist.SchemeName,
          SchemeCode: isExist.SchemeCode,
          SchemeType: isExist.SchemeType,
          ReceiptNo: body.rno,
          ReceiptDate: body.rdate,
          CardNo: isExist.CardNo,
          MobileNo: body.mno,
          MemberName: body.mname,
          Address: body.address,
          CollectionPoint: body.cpoint,
          CashDesc: body.CashDesc,
          CashAmount: body.CashAmount,
          CardDesc: body.CardDesc,
          CardAmount: body.CardAmount,
          OnlineParticulars: body.OnlineParticulars,
          OnlineAcc: body.OnlineAcc,
          OnlineDesc: body.OnlineDesc,
          OnlineAmount: body.OnlineAmount,
          UPIParticulars: body.UPIParticulars,
          UPIAcc: body.UPIAcc,
          UPIDesc: body.UPIDesc,
          UPIAmount: body.UPIAmount,
          Description: body.desc,
          Amount: body.amount,
          GoldAmount: body.gamount,
          GoldWt: body.gweight,
          Incharge: body.incharge,
        },
      });

      console.log("Receipt created:", result);
      return NextResponse.json(
        { message: "Receipt created successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Scheme Code does not exist" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error creating receipt:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

function calculateNextDate(joinDate, months) {
  const currentDate = new Date(joinDate);
  currentDate.setMonth(currentDate.getMonth() + months);
  return currentDate.toISOString().split("T")[0];
}
