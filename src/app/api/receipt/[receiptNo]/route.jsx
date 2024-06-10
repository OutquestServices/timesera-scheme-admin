"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const prisma = new PrismaClient();
    const { receiptNo } = params;

    try {
        await prisma.oRIGIN_SCHEME_RECEIPT.delete({
            where: {
                ReceiptNo: receiptNo,
            },
        });

        return NextResponse.json({ message: "Receipt deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
