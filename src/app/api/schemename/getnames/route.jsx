"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request){
    const prisma = new PrismaClient();
    try{
        const schemenames = await prisma.oRIGIN_SCHEME_NAME.findMany({});
        return NextResponse.json(schemenames);
    } catch(error){
        console.error(error);
        return NextResponse.error(error);
    } finally {
        prisma.$disconnect();
    }
}