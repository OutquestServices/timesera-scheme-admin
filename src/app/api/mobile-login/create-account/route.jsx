"use server";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
    const prisma = new PrismaClient();
    try {
        const body = await request.json();
        const { MemberName, Gender, City, Address, Pincode, State, District, MobileNo, Password, Email, Dob, Anniversary } = body;

        // Check if MobileNo already exists
        const existingUser = await prisma.mOBILE_LOGIN.findUnique({
            where: {
                MobileNo: MobileNo,
            },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Mobile number already registered' }, { status: 409 });
        }

        // Create a new user account
        const newUser = await prisma.mOBILE_LOGIN.create({
            data: {
                MemberName,
                Gender,
                City,
                Address,
                Pincode,
                State,
                District,
                MobileNo,
                Password,
                Email,
                Dob,
                Anniversary,
            },
        });

        return NextResponse.json({ message: 'Account created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating account:', error);  // Log the error
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
