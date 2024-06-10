"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        const settlements = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT.findMany({
            where: {
                Discontinue: true,
            },
        });

        return NextResponse.json(settlements);
    } catch (error) {
        return NextResponse.error({
            status: 400,
            body: { error: error.message },
        });
    } finally {
        await prisma.$disconnect();
    }
}
