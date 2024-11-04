import { PrismaClient, Devis } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

//get all devis for a user
export async function getDevis(req: NextRequest) {

  try {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const devis : Devis[] = await prisma.devis.findMany({
        where: { userId:parseInt(id) }
        
    });
    return NextResponse.json(devis);

  }catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}