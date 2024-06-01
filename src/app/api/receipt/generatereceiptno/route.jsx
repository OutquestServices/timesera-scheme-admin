"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        // Count the number of rows in the ORIGIN_SCHEME_RECEIPT table
        const totalReceipts = await prisma.oRIGIN_SCHEME_RECEIPT.count();

        // Return the total number of rows plus one
        const nextReceiptNumber = totalReceipts + 1;

        return NextResponse.json({ nextReceiptNumber });
    } catch (error) {
        console.error('Error fetching the receipt count:', error);
        return NextResponse.json({ error: 'Failed to fetch the receipt count' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
