import { PrismaClient, Client } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();

//get all clients for a user
export async function getClients(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const clients : Client[] = await prisma.client.findMany({
            where: { userId:parseInt(id) }
            
        });

        return NextResponse.json(clients);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

//create a new client
export async function createClient(req: NextRequest) {
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
export async function updateClient(req: NextRequest) {
    try {
        const data : Client = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const client: Client = await prisma.client.update({
            where: { id:parseInt(id) },
            data: data
        });
        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


//delete client
export async function deleteClient(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const client: Client = await prisma.client.delete({
            where: { id:parseInt(id) }
        });
        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


//get client by id
export async function getClient(req: NextRequest) {

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
    
        if (!id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
    
        const client: Client | null = await prisma.client.findUnique({
            where: { id:parseInt(id) }
        });
    
    
        return NextResponse.json(client, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

//get client by email
export async function getClientByEmail(req: NextRequest) {

    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
    
        if (!email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
    
        const client: Client | null = await prisma.client.findFirst({
            where: { email: email }
        });
    
    
        return NextResponse.json(client, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


