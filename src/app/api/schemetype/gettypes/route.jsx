"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        const schemtypes = await prisma.oRIGIN_SCHEMETYPE.findMany({});
        return NextResponse.json(schemtypes);
    } catch (error) {
        console.error(error);
        return NextResponse.error(error);
    } finally {
        await prisma.$disconnect();
    }
}