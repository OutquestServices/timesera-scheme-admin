'use server'
import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

function calculateNextDate(joinDate, months) {
  const currentDate = new Date(joinDate);
  currentDate.setMonth(currentDate.getMonth() + months);
  return currentDate.toISOString().split("T")[0];
}

export async function POST(req) {
  try {
  const prisma = new PrismaClient();
    const data = await req.formData();

    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");
    const amount = data.get("amount");
    const providerReferenceId = data.get("providerReferenceId");

    const st = `/pg/v1/status/${merchantId}/${transactionId}${process.env.NEXT_API_MERCHANT_KEY}`;
    const dataSha256 = sha256(st).toString();
    const checksum = `${dataSha256}###${process.env.NEXT_API_MERCHANT_VERSION}`;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    };

    const response = await axios.request(options);

    const parts = transactionId.split('_');
    const membername = parts[1];
    const phonenum = parts[2];
    const cardno= parts[3];

    const isExist = await prisma.oRIGIN_SCHEME_USER.findUnique({
      where: {
        CardNo: cardno,
      },
    });

    if (response.data.code === "PAYMENT_SUCCESS") {
      if (isExist) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const rdate = `${year}-${month}-${day}`;
        const nextDate = calculateNextDate(rdate, 1);
        const ActualDate = calculateNextDate(isExist.JoinDate, cardno + 1);
  
        await prisma.oRIGIN_SCHEME_USER.update({
          where: {
            CardNo: cardno,
          },
          data: {
            LastDatePaid: rdate,
            NextDateToPay: nextDate,
            ActualDateToPay: ActualDate,
          },
        });

        const result = await prisma.oRIGIN_SCHEME_RECEIPT.create({
          data: {
            SchemeName: isExist.SchemeName,
            SchemeCode: isExist.SchemeCode,
            SchemeType: isExist.SchemeType,
            ReceiptNo: transactionId,
            ReceiptDate: rdate,
            CardNo: isExist.CardNo,
            MobileNo: phonenum,
            MemberName: membername,
            Address: isExist.Address,
            OnlineAcc: providerReferenceId,
            OnlineDesc: transactionId,
            OnlineAmount: parseInt(amount,10)/100,
            Amount: parseInt(amount,10)/100,
            Incharge: "Phonepe",
          },
        });

        await prisma.transactions.create({
          data:{
            Status:"Success",
            refid: providerReferenceId,
            transid: transactionId,
            userid: membername,
            usermobile: phonenum,
            cardno: cardno,
            Amount:parseInt(amount,10)/100,
          },
        });
  
        console.log("Receipt created:", result);
      }
      return NextResponse.redirect(`https://timeserasoftware.in/success?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`, {
        status: 301,
      });
    } else {
      if (isExist) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const rdate = `${year}-${month}-${day}`;
        const nextDate = calculateNextDate(rdate, 1);
        const ActualDate = calculateNextDate(isExist.JoinDate, cardno + 1);
  
        await prisma.oRIGIN_SCHEME_USER.update({
          where: {
            CardNo: cardno,
          },
          data: {
            LastDatePaid: rdate,
            NextDateToPay: nextDate,
            ActualDateToPay: ActualDate,
          },
        });
        await prisma.transactions.create({
          data:{
            Status:"Failure",
            refid: providerReferenceId,
            transid: transactionId,
            userid: membername,
            usermobile: phonenum,
            cardno: cardno,
            Amount:parseInt(amount,10)/100,
          },
        });
      }
      return NextResponse.redirect(`https://timeserasoftware.in/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`, {
        status: 301,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(`https://timeserasoftware.in/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`, { status: 301 });
  }
}
