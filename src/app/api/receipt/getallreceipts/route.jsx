"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();
    try {
        const receipts = await prisma.oRIGIN_SCHEME_RECEIPT.findMany();
        return NextResponse.json(receipts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
