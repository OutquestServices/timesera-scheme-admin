"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
  const prisma = new PrismaClient();
  try {
    const duelists = await prisma.oRIGIN_SCHEME_USER.findMany({});
    const currentDate = new Date();
    
    const filteredDuelists = duelists.filter((duelist) => {
      const lastDatePaid = new Date(duelist.LastDatePaid);
      const differenceInDays = Math.floor((currentDate - lastDatePaid) / (1000 * 60 * 60 * 24));
      return differenceInDays >= 30;
    });
    
    return NextResponse.json(filteredDuelists);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
