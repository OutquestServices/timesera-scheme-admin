"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request) {
    try {
        const body = await request.json();
        const { cardNo } = body;

        console.log('Received cardNo:', cardNo);

        // Check if there are any receipts in ORIGIN_SCHEME_RECEIPT with this CardNo
        const relatedReceipts = await prisma.oRIGIN_SCHEME_RECEIPT.findMany({
            where: { CardNo: cardNo },
        });

        console.log('Related receipts found:', relatedReceipts);

        if (relatedReceipts.length > 0) {
            return NextResponse.json({ error: 'Cannot delete, CardNo is associated with receipts' }, { status: 400 });
        }

        // If no related receipts found, proceed with deletion
        const deleteResult = await prisma.oRIGIN_SCHEME_USER.deleteMany({
            where: { CardNo: cardNo },
        });

        console.log('Delete result:', deleteResult);

        return NextResponse.json({ message: 'Scheme member deleted successfully' });
    } catch (error) {
        console.error('Error deleting scheme member:', error);
        return NextResponse.json({ error: 'Failed to delete scheme member' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
