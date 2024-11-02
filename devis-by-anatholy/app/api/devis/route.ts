import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { client, montant } = await req.json();
  const devis = await prisma.devis.create({
    data: {
      client,
      montant,
    },
  });
  return NextResponse.json(devis, { status: 201 });
}

export async function GET() {
  const devis = await prisma.devis.findMany();
  return NextResponse.json(devis, { status: 200 });
}

export async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    return POST(req);
  } else if (req.method === 'GET') {
    return GET();
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}