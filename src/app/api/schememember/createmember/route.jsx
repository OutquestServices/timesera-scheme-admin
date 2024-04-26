"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();

        const result = await prisma.oRIGIN_SCHEME_USER.create({
            data: {
                SchemeType: body.schemetype,
                SchemeName: body.schemename,
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
                NextDateToPay: body.nextdatetopay
            },
        });

        return NextResponse.json({ message: result });

    } catch (error) {
        return NextResponse.error({
            status: 400,
            body: { error: error.message },
        });
    } finally {
        await prisma.$disconnect();
    }
}