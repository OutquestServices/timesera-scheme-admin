"use server";

import { ReceiptSchema, getPrismaClient } from '@/components/db/Connection';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const tn = request.nextUrl.searchParams.get('tn');
    const prisma = await getPrismaClient(tn);


    try {
        await ReceiptSchema(prisma);

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
        console.error('Error fetching receipts:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
