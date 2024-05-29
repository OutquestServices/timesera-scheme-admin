"use server";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const { username, password } = body;

        // Find the user by username
        const user = await prisma.lOGIN_USER.findFirst({
            where: {
                UserName: username,
                Password: password,
            },
        });

        // Check if user exists and password matches
        if (user) {
            // Authentication successful
            return NextResponse.json({ message: 'Login successful' });
        } else {
            // Authentication failed
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }
    } catch (error) {
        console.error('Error during login:', error);  // Log the error
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
