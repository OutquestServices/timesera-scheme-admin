"use server";

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

        const receipts = await prisma.oRIGIN_SCHEME_RECEIPT.findMany({
            where: {
                ReceiptDate: today,
            },
            select: {
                CardNo: true,
                MemberName: true,
                SchemeName: true,
                Amount: true,
            },
        });

        return NextResponse.json(receipts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
