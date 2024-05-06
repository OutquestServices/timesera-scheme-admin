"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
  const prisma = new PrismaClient();
  try {
    const body = await request.json();

    const ifExists = await prisma.oRIGIN_SCHEME_NAME.findUnique({
      where: {
        SchemeName: body.schemename,
      },
    });

    if (!ifExists) {
      return NextResponse.error({
        status: 400,
        body: { error: "Scheme code does not exist" },
      });
    }

    const result = await prisma.oRIGIN_SCHEME_USER.create({
      data: {
        SchemeType: ifExists.SchemeType,
        SchemeName: ifExists.SchemeName,
        SchemeCode: ifExists.SchemeCode,
        MemberName: body.membername,
        CardNo: body.cardno,
        Gender: body.gender,
        City: body.city,
        Address: body.address,
        Pincode: body.pincode,
        State: body.state,
        District: body.district,
        LandLine: body.landline,
        Mobile1: body.mobile1,
        Mobile2: body.mobile2,
        Email: body.email,
        Dob: body.dob,
        Anniversary: body.anniversary,
        Nominee: body.nominee,
        MobileNo: body.mobileno,
        Incharge: body.incharge,
        JoinDate: body.joindate,
        CollectionPoint: body.collectionpoint,
        LastDatePaid: body.lastdatepaid,
        ActualDateToPay: body.actualdatetopay,
        NextDateToPay: body.nextdatetopay,
      },
    });

    return NextResponse.json({ message: "Data added successfully" });
  } catch (error) {
    return NextResponse.error({
      status: 400,
      body: { error: error.message },
    });
  } finally {
    await prisma.$disconnect();
  }
}



// structure
// {
//   "code": "yfthg",
//   "membername": "Mohith",
//   "cardno": "GW2",
//   "gender": true,
//   "city": "Nellore",
//   "address": "16-1-301-2, Gandhi Bomma",
//   "pincode": 524001,
//   "state": "AP",
//   "district": "Nellore",
//   "landline": "dfsd",
//   "mobile1": "923243",
//   "mobile2": "34343",
//   "email": "Dfsdsd",
//   "dob": "2024-04-24",
//   "anniversary": "2024-04-24",
//   "nominee": "dfsd",
//   "mobileno": "9797",
//   "incharge": "fsdfsd",
//   "joindate": "2024-04-24",
//   "collectionpoint": true,
//   "lastdatepaid": "2024-04-24",
//   "actualdatetopay": "2024-04-24",
//   "nextdatetopay": "2024-04-24"
// }