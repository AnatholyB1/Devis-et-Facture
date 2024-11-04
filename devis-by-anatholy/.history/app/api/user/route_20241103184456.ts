import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, User } from '@prisma/client';


const prisma = new PrismaClient();


//update user profile
export async function PUT(req: NextRequest) {
    const data : User = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }


    const user: User = await prisma.user.update({
        where: { id:parseInt(id) },
        data: data
    });
    return NextResponse.json(user, { status: 201 });
}

//get user profile
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user: User | null = await prisma.user.findUnique({
        where: { id:parseInt(id) }
    });

    
    return NextResponse.json(user, { status: 200 });
}