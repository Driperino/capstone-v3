import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('leafmatrix');

    const plants = await db
      .collection('plants')
      .find({ userId: session.user.id })
      .toArray();

    return NextResponse.json(plants, { status: 200 });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.json(
      { message: 'Failed to fetch plants' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, species, description, imageUrl } = body;

    if (!name || !species) {
      return NextResponse.json(
        { message: 'Name and species are required' },
        { status: 400 }
      );
    }

    const newPlant = {
      userId: session.user.id,
      name,
      species,
      description: description || '',
      datePlanted: new Date(),
      growthStages: [],
      careSchedule: { wateringFrequency: 7 },
      careHistory: [],
      imageUrl: imageUrl || '',
    };

    const client = await clientPromise;
    const db = client.db('leafmatrix');
    const result = await db.collection('plants').insertOne(newPlant);

    return NextResponse.json(
      { ...newPlant, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating plant:', error);
    return NextResponse.json(
      { message: 'Failed to add plant' },
      { status: 500 }
    );
  }
}
