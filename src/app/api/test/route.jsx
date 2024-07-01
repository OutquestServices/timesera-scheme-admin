import { NextResponse } from 'next/server';
import { getPrismaClient,ReceiptSchema } from '@/components/db/Connection';

export async function GET(request) {
    const prisma = await getPrismaClient("ORIGIN_JST");

    try {
        await ReceiptSchema(prisma);

        const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

        const receipts = await prisma.oRIGIN_SCHEME_RECEIPT.findMany();

        return NextResponse.json(receipts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
