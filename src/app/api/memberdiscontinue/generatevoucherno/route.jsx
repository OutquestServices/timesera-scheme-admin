"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        // Count the number of rows in the ORIGIN_SCHEME_RECEIPT table
        const totalSettlements = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT.count();

        // Return the total number of rows plus one
        const nextSettlementNumber = totalSettlements + 1;

        return NextResponse.json({ nextSettlementNumber });
    } catch (error) {
        console.error('Error fetching the settlement count:', error);
        return NextResponse.json({ error: 'Failed to fetch the settlement count' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
