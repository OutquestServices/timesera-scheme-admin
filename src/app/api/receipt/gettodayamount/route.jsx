"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        const currentDate = new Date().toISOString().split('T')[0];

        const result = await prisma.oRIGIN_SCHEME_RECEIPT.aggregate({
            _sum: {
                Amount: true,
            },
            _count: {
                id: true,
            },
            where: {
                ReceiptDate: currentDate,
            },
        });

        const totalAmount = result._sum.Amount || 0;
        const totalReceipts = result._count.id || 0;

        return NextResponse.json({ totalAmount, totalReceipts });
    } catch (error) {
        console.error(error);
        return NextResponse.error(error);
    } finally {
        await prisma.$disconnect();
    }
}