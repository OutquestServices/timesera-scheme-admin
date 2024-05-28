"use server";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {
  const prisma = new PrismaClient();
  try {
    const members = await prisma.oRIGIN_SCHEME_USER.findMany({});

    return NextResponse.json(members);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
