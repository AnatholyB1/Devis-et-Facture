import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { client, montant } = req.body;
    const devis = await prisma.devis.create({
      data: {
        client,
        montant,
      },
    });
    res.status(201).json(devis);
  } else if (req.method === 'GET') {
    const devis = await prisma.devis.findMany();
    res.status(200).json(devis);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}