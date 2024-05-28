"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        const currentDate = new Date().toISOString().split('T')[0];

        const discontinuedUsers = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT.findMany({
            where: {
                Discontinue: true,
                Date: currentDate,
            },
        });

        return NextResponse.json(discontinuedUsers);
    } catch (error) {
        return NextResponse.error({
            status: 500,
            body: { error: "Internal server error" },
        });
    } finally {
        await prisma.$disconnect();
    }
}
