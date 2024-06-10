"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        const paymentmethods = await prisma.oNLINEMODE_MAST.findMany({});
        return NextResponse.json(paymentmethods);
    } catch (error) {
        console.error(error);
        return NextResponse.error(error);
    } finally {
        prisma.$disconnect();
    }
}