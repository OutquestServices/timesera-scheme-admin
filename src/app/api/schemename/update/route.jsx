"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function PUT(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const { id, sname, schemetype, samount, sduration, spersons, bmonth, bamount, svalue, commper, commamt, code, continuous } = body;
        const isSchemeMemberExist = await prisma.oRIGIN_SCHEME_USER.findFirst({
            where: { SchemeName: sname },
        });
        if (isSchemeMemberExist) {
            return NextResponse.json({
                status: 400,
                body: { error: "Scheme Member is already created for this scheme type. Cannot modify." },
            });
        }
        const result = await prisma.oRIGIN_SCHEME_NAME.update({
            where: { id: id },
            data: {
                SchemeName: sname,
                SchemeType: schemetype,
                SchemeDuration: sduration,
                SchemeAmount: samount,
                SchemePersons: spersons,
                BonusMonth: bmonth,
                BonusAmount: bamount,
                SchemeValue: svalue,
                Commper: commper,
                Commamt: commamt,
                SchemeCode: code,
                Continuous: continuous
            },
        });
        return NextResponse.json({ message: "Modified succesfully" });
    }
    catch (error) {
        console.error('Error updating scheme name:', error);
        return NextResponse.json({
            status: 500,
            body: { error: error.message },
        });
    } finally {
        await prisma.$disconnect();
    }
}