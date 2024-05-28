"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        const currentDate = new Date().toISOString().split('T')[0];

        const receipts = await prisma.oRIGIN_SCHEME_RECEIPT.groupBy({
            by: ['SchemeName'],
            _sum: {
                Amount: true,
            },
            where: {
                ReceiptDate: currentDate,
            },
        });

        const result = receipts.map(receipt => ({
            SchemeName: receipt.SchemeName,
            totalAmount: receipt._sum.Amount || 0,
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
