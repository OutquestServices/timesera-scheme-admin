"use server";

import {
  SchemenameSchema,
  Schemeuserschema,
  getPrismaClient,
} from "@/components/db/Connection";
// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  // const prisma = new PrismaClient();
  const tn = request.headers.get("tn");
  const prisma = await getPrismaClient(tn);
  try {
    await Schemeuserschema(prisma);
    await SchemenameSchema(prisma);
    const body = await request.json();
    const { schemeName } = body;

    console.log("Received schemeName:", schemeName);

    // Check if there are any users in ORIGIN_SCHEME_USER with this SchemeName
    const relatedUsers = await prisma.oRIGIN_SCHEME_USER.findMany({
      where: { SchemeName: schemeName },
    });

    if (relatedUsers.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete, scheme name is associated with users" },
        { status: 400 }
      );
    }

    // If no related users found, proceed with deletion
    const deleteResult = await prisma.oRIGIN_SCHEME_NAME.deleteMany({
      where: { SchemeName: schemeName },
    });

    console.log("Delete result:", deleteResult);

    return NextResponse.json({ message: "Scheme name deleted successfully" });
  } catch (error) {
    console.error("Error deleting scheme name:", error);
    return NextResponse.json(
      { error: "Failed to delete scheme name" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
