import { PrismaClient, Client } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();

//get all clients for a user
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }


        const clientId = searchParams.get('clientId');
        if (clientId) {
            const client: Client | null = await prisma.client.findUnique({
                where: { id:clientId }
            });
            return NextResponse.json(client, { status: 200 });
        }


        const clientEmail = searchParams.get('email');
        if (clientEmail) {
            const client: Client | null = await prisma.client.findFirst({
                where: { email: clientEmail }
            });
            return NextResponse.json(client, { status: 200 });
        }




        const clients : Client[] = await prisma.client.findMany({
            where: { userId:id }
            
        });

        return NextResponse.json(clients);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

//create a new client
export async function POST(req: NextRequest) {
    try {
        const data : Client = await req.json();
        const client = await prisma.client.create({
            data: data
        });
        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


//update client
export async function PUT(req: NextRequest) {
    try {
        const data : Client = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const client: Client = await prisma.client.update({
            where: { id:id},
            data: data
        });
        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


//delete client
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const client: Client = await prisma.client.delete({
            where: { id:id }
        });
        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


