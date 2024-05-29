"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
    const prisma = new PrismaClient();
    try {
        const today = new Date();
        const month = today.getMonth() + 1; // getMonth() is zero-based
        const day = today.getDate();
        const formattedDate = `${month}-${day}`; // Format as MM-DD

        const usersWithBirthday = await prisma.oRIGIN_SCHEME_USER.count({
            where: {
                Dob: {
                    endsWith: formattedDate,
                },
            },
        });

        const usersWithAnniversary = await prisma.oRIGIN_SCHEME_USER.count({
            where: {
                Anniversary: {
                    endsWith: formattedDate,
                },
            },
        });

        return NextResponse.json({
            totalBirthdays: usersWithBirthday,
            totalAnniversaries: usersWithAnniversary,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
