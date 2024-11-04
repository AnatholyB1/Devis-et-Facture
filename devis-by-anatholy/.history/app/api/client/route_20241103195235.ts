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
