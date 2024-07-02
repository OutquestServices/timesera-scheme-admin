"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  Schemeuserschema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function GET(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await Schemeuserschema(prisma);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, pad single digits with 0
    const day = String(today.getDate()).padStart(2, "0"); // pad single digits with 0
    const formattedDate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

    // Query to get total count and details of users joined today
    const usersJoinedToday = await prisma.oRIGIN_SCHEME_USER.findMany({
      where: {
        JoinDate: formattedDate,
      },
      select: {
        MemberName: true,
        SchemeName: true,
        CardNo: true,
      },
    });

    // Get the total count of users joined today
    const totalJoinedToday = usersJoinedToday.length;

    return NextResponse.json({
      totalJoinedToday: totalJoinedToday,
      users: usersJoinedToday,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
