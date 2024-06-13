"use server";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const { MobileNo } = body;

        if (!MobileNo) {
            return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
        }

        // Find the user by MobileNo
        const user = await prisma.mOBILE_LOGIN.findUnique({
            where: {
                MobileNo: MobileNo,
            },
        });

        if (user) {
            // User found
            return NextResponse.json(user);
        } else {
            // User not found
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);  // Log the error
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
