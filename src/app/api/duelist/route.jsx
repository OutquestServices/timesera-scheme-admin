"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  SchemesettlementSchema,
  Schemeuserschema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function GET(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    Schemeuserschema(prisma);
    SchemesettlementSchema(prisma);
    // Fetch all duelists
    const duelists = await prisma.oRIGIN_SCHEME_USER.findMany({});

    // Fetch all settlements that are settled or discontinued
    const settlements = await prisma.oRIGIN_SCHEME_USER_SETTLEMENT.findMany({
      where: {
        OR: [{ Settled: true }, { Discontinue: true }],
      },
    });

    // Get the list of CardNo from the settlements to filter out
    const excludedCardNos = settlements.map((settlement) => settlement.CardNo);

    const currentDate = new Date();

    const filteredDuelists = duelists
      .map((duelist) => {
        if (excludedCardNos.includes(duelist.CardNo)) {
          return null; // Exclude duelists with settled or discontinued settlements
        }

        let lastDatePaid = duelist.LastDatePaid
          ? new Date(duelist.LastDatePaid)
          : null;
        let actualDateToPay = duelist.ActualDateToPay
          ? new Date(duelist.ActualDateToPay)
          : null;
        let differenceInDays;

        if (lastDatePaid) {
          differenceInDays = Math.floor(
            (currentDate - lastDatePaid) / (1000 * 60 * 60 * 24)
          );
        } else if (actualDateToPay) {
          differenceInDays = Math.floor(
            (currentDate - actualDateToPay) / (1000 * 60 * 60 * 24)
          );
        } else {
          return null;
        }

        if (
          differenceInDays >= 30 ||
          (!lastDatePaid && differenceInDays >= 0)
        ) {
          const monthsDue = Math.ceil(differenceInDays / 30);
          return { ...duelist, monthsDue };
        }

        return null;
      })
      .filter((duelist) => duelist !== null);

    return NextResponse.json(filteredDuelists);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
