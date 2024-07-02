"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  SchemesettlementSchema,
  getPrismaClient,
} from "@/components/db/Connection";
import { Schemeuserschema } from "@/components/db/Connection";

// const prisma = new PrismaClient();

export async function GET(request) {
  const prisma = await getPrismaClient(request.headers.get("tn"));
  const { searchParams } = new URL(request.url);
  const settled = searchParams.get("settled") === "true";
  const discontinue = searchParams.get("discontinue") === "true";

  try {
    await SchemesettlementSchema(prisma);
    await Schemeuserschema(prisma);
    let whereClause = {};

    if (settled || discontinue) {
      whereClause = {
        CardNo: {
          in: await prisma.oRIGIN_SCHEME_USER_SETTLEMENT
            .findMany({
              where: {
                OR: [
                  settled && { Settled: true },
                  discontinue && { Discontinue: true },
                ].filter(Boolean),
              },
              select: {
                CardNo: true,
              },
            })
            .then((settlements) =>
              settlements.map((settlement) => settlement.CardNo)
            ),
        },
      };
    } else {
      const settlementCardNos = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT
        .findMany({
          select: {
            CardNo: true,
          },
        })
        .then((settlements) =>
          settlements.map((settlement) => settlement.CardNo)
        );

      whereClause = {
        CardNo: {
          notIn: settlementCardNos,
        },
      };
    }

    const members = await prisma.oRIGIN_SCHEME_USER.findMany({
      where: whereClause,
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
