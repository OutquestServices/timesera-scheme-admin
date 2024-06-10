"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        const schememembers = await prisma.oRIGIN_SCHEME_USER.findMany({});
        return NextResponse.json(schememembers);
    } catch (error) {
        console.error(error);
        return NextResponse.error(error);
    } finally {
        prisma.$disconnect();
    }
}