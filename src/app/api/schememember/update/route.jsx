"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function PUT(request) {
    const prisma = new PrismaClient();
    try{
        const body = await request.json();
        const { id, schemetype, schemename, membername, cardno, gender, city, address, pincode, state, district, landline, mobile1, mobile2, email, dob, anniversary, nominee, mobileno, incharge, joindate, collectionpoint,  lastdatepaid, actualdatetopay, nextdatetopay } = body;
        const isReceiptExist = await prisma.oRIGIN_SCHEME_RECEIPT.findFirst({
            where: { CardNo: cardno },
        });
        const ifExists = await prisma.oRIGIN_SCHEME_NAME.findUnique({
            where: {
                SchemeName: body.schemename,
            },
        });
        if (isReceiptExist) {
            return NextResponse.json({
                status: 400,
                body: { error: "Receipt is already created for this member. Cannot modify." },
            });
        }
        const result = await prisma.oRIGIN_SCHEME_USER.update({
            where: { id: id },
            data: {
                SchemeType: schemetype,
                SchemeName: schemename,
                SchemeCode: ifExists.SchemeCode,
                MemberName: membername,
                CardNo: cardno,
                Gender: gender,
                City: city,
                Address: address,
                Pincode: pincode,
                State: state,
                District: district,
                LandLine: landline,
                Mobile1: mobile1,
                Mobile2: mobile2,
                Email: email,
                Dob: dob,
                Anniversary: anniversary,
                Nominee: nominee,
                MobileNo: mobileno,
                Incharge: incharge,
                JoinDate: joindate,
                CollectionPoint: collectionpoint,
                LastDatePaid: lastdatepaid,
                ActualDateToPay: actualdatetopay,
                NextDateToPay: nextdatetopay,
            },
        });
        return NextResponse.json({ message: "Modified succesfully" });
    }
    catch (error) {
        console.error('Error updating scheme member:', error);
        return NextResponse.json({
            status: 500,
            body: { error: error.message },
        });
    } finally {
        await prisma.$disconnect();
    }
}