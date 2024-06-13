"use server";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const { MemberName, Email, MobileNo, Category, Feedback } = body;

        // Create feedback record in the database
        const newFeedback = await prisma.fEEDBACK.create({
            data: {
                MemberName,
                Email,
                MobileNo,
                Category,
                Feedback,
            },
        });

        return NextResponse.json({ message: 'Feedback submitted successfully', feedback: newFeedback });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
