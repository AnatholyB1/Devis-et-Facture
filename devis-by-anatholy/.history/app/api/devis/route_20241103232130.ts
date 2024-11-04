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
        where: { userId:id }
        
    });
    return NextResponse.json(devis);

  }catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

//create a new devis
export async function createDevis(req: NextRequest) {
  try {
    const data : Devis = await req.json();
    const devis = await prisma.devis.create({
      data: data
    });
    return NextResponse.json(devis, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


//update devis
export async function updateDevis(req: NextRequest) {
  try {
    const data : Devis = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const devis: Devis = await prisma.devis.update({
      where: { id:id },
      data: data
    });
    return NextResponse.json(devis, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

//delete devis
export async function deleteDevis(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await prisma.devis.delete({
      where: { id:id}
    });
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

//get devis by id
export async function getDevisById(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const devis: Devis | null = await prisma.devis.findUnique({
      where: { id:id }
    });
    return NextResponse.json(devis, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
