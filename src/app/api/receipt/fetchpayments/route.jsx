"use server";

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

        const cashPayments = await prisma.oRIGIN_SCHEME_RECEIPT.groupBy({
            by: ['ReceiptDate'],
            where: {
                ReceiptDate: today,
            },
            _sum: {
                CashAmount: true,
            },
        });

        const cardPayments = await prisma.oRIGIN_SCHEME_RECEIPT.groupBy({
            by: ['ReceiptDate'],
            where: {
                ReceiptDate: today,
            },
            _sum: {
                CardAmount: true,
            },
        });

        const onlinePayments = await prisma.oRIGIN_SCHEME_RECEIPT.groupBy({
            by: ['ReceiptDate'],
            where: {
                ReceiptDate: today,
            },
            _sum: {
                OnlineAmount: true,
            },
        });

        const upiPayments = await prisma.oRIGIN_SCHEME_RECEIPT.groupBy({
            by: ['ReceiptDate'],
            where: {
                ReceiptDate: today,
            },
            _sum: {
                UPIAmount: true,
            },
        });

        const result = {
            cash: cashPayments[0]?._sum.CashAmount || 0,
            card: cardPayments[0]?._sum.CardAmount || 0,
            online: onlinePayments[0]?._sum.OnlineAmount || 0,
            upi: upiPayments[0]?._sum.UPIAmount || 0,
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
