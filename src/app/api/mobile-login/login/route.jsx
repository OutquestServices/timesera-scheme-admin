"use server";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const { mobileno, password } = body;

        // Find the user by username
        const user = await prisma.mOBILE_LOGIN.findFirst({
            where: {
                MobileNo: mobileno,
                Password: password,
            },
        });

        // Check if user exists and password matches
        if (user) {
            // Authentication successful
            return NextResponse.json({ message: 'Login successful' });
        } else {
            // Authentication failed
            return NextResponse.json({ error: 'Invalid mobile number or password' }, { status: 401 });
        }
    } catch (error) {
        console.error('Error during login:', error);  // Log the error
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
