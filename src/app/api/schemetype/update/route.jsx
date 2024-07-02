"use server";

import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {
  SchemenameSchema,
  SchemetypeSchema,
  getPrismaClient,
} from "@/components/db/Connection";

export async function PUT(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await SchemenameSchema(prisma);
    await SchemetypeSchema(prisma);
    
    const body = await request.json();
    const { id, type, mode } = body;

    // Check if the scheme type exists in the ORIGIN_SCHEME_NAME model
    const isSchemeNameExist = await prisma.oRIGIN_SCHEME_NAME.findFirst({
      where: { SchemeType: type },
    });

    if (isSchemeNameExist) {
      return NextResponse.json({
        status: 400,
        body: {
          error:
            "Scheme name is already created for this scheme type. Cannot modify.",
        },
      });
    }

    // Update the scheme type in the ORIGIN_SCHEMETYPE model
    const result = await prisma.oRIGIN_SCHEMETYPE.update({
      where: { id: id },
      data: {
        SchemeType: type,
        SchemeMode: mode,
      },
    });

    return NextResponse.json({ message: result });
  } catch (error) {
    console.error("Error updating scheme type:", error);
    return NextResponse.json({
      status: 500,
      body: { error: error.message },
    });
  } finally {
    await prisma.$disconnect();
  }
}
