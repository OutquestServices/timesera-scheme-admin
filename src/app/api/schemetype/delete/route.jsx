"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const { schemeType } = body;

        // Check if there are any records in ORIGIN_SCHEME_NAME with this SchemeType
        const relatedSchemes = await prisma.oRIGIN_SCHEME_NAME.findMany({
            where: { SchemeType: schemeType },
        });

        if (relatedSchemes.length > 0) {
            return NextResponse.json({ error: 'Cannot delete, already we have scheme names' }, { status: 400 });
        }

        // If no related schemes found, proceed with deletion
        await prisma.oRIGIN_SCHEMETYPE.deleteMany({
            where: { SchemeType: schemeType },
        });

        return NextResponse.json({ message: 'Scheme type deleted successfully' });
    } catch (error) {
        console.error('Error deleting scheme type:', error);
        return NextResponse.json({ error: 'Failed to delete scheme type' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
