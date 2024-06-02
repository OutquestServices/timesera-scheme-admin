"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();

        const { schemeName } = body;

        // Fetch the scheme details based on the SchemeName
        const scheme = await prisma.oRIGIN_SCHEME_NAME.findUnique({
            where: { SchemeName: schemeName },
        });

        if (!scheme) {
            return NextResponse.json({ error: 'Scheme not found' }, { status: 404 });
        }

        const schemeCode = scheme.SchemeCode;
        let cardNo;

        if (scheme.Continuous) {
            // If continuous, find the maximum numerical CardNo starting with numbers
            const users = await prisma.oRIGIN_SCHEME_USER.findMany({
                select: { CardNo: true },
            });

            const numericCardNumbers = users
                .map(user => user.CardNo)
                .filter(cardNo => /^\d+$/.test(cardNo)) // Only numeric card numbers
                .map(cardNo => parseInt(cardNo, 10)); // Convert to integers

            const maxCardNo = Math.max(0, ...numericCardNumbers);
            cardNo = (maxCardNo + 1).toString();
        } else {
            // If not continuous, generate card number based on scheme code
            const users = await prisma.oRIGIN_SCHEME_USER.findMany({
                where: {
                    SchemeCode: {
                        startsWith: schemeCode,
                    },
                },
                orderBy: {
                    CardNo: 'desc',
                },
            });

            if (users.length > 0) {
                const lastCardNo = users[0].CardNo;
                const lastIndex = parseInt(lastCardNo.replace(schemeCode, ''), 10);
                cardNo = schemeCode + (lastIndex + 1);
            } else {
                cardNo = schemeCode + '1';
            }
        }

        return NextResponse.json({ cardNo });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
