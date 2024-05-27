"use server";

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

        const payments = await prisma.oRIGIN_SCHEME_RECEIPT.groupBy({
            by: ['PaymentMode'],
            where: {
                ReceiptDate: today,
            },
            _sum: {
                Amount: true,
            },
        });

        const result = {
            cash: 0,
            card: 0,
            online: 0,
            upi: 0,
        };

        payments.forEach(payment => {
            result[payment.PaymentMode.toLowerCase()] = payment._sum.Amount || 0;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
