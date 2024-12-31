import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { faker } from '@faker-js/faker';

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

    // Update plants if fields are missing
    const updates = plants.map(async (plant) => {
      const updatedFields: Partial<typeof plant> = {};

      // Check for missing fields and generate default data
      if (!Array.isArray(plant.careSchedule)) {
        updatedFields.careSchedule = generateFakeCareSchedule();
      }
      if (!plant.species) {
        updatedFields.species = faker.lorem.word();
      }
      if (!plant.description) {
        updatedFields.description = faker.lorem.sentence();
      }
      if (!plant.imageUrl) {
        updatedFields.imageUrl = faker.image.nature(200, 200, true);
      }

      // If there are updates, apply them to the database
      if (Object.keys(updatedFields).length > 0) {
        await db
          .collection('plants')
          .updateOne({ _id: plant._id }, { $set: updatedFields });
        Object.assign(plant, updatedFields);
      }

      return plant;
    });

    const normalizedPlants = await Promise.all(updates);

    return NextResponse.json(normalizedPlants, { status: 200 });
  } catch (error) {
    console.error('Error fetching or updating plants:', error);
    return NextResponse.json(
      { message: 'Failed to fetch plants', error: error.message },
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
      description: description || faker.lorem.sentence(),
      datePlanted: new Date().toISOString(),
      growthStages: [],
      careSchedule: generateFakeCareSchedule(),
      careHistory: [],
      imageUrl: imageUrl || faker.image.nature(200, 200, true),
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
      { message: 'Failed to add plant', error: error.message },
      { status: 500 }
    );
  }
}

// Helper function to generate a fake care schedule for a plant because i'm bad at life and couldnt figure out how to do it properly
function generateFakeCareSchedule() {
  const schedule = [];
  const totalDays = 30;

  // Add watering actions twice a week
  for (let i = 1; i <= totalDays; i++) {
    if (i % 3 === 0) {
      schedule.push({ day: `Day ${i}`, action: 'Water the plant' });
    }
  }

  // Add fertilizing action once a month
  schedule.push({ day: 'Day 1', action: 'Apply fertilizer' });

  // Add pest check actions (4 times a month)
  for (let i = 1; i <= totalDays; i++) {
    if (i % 7 === 0) {
      schedule.push({ day: `Day ${i}`, action: 'Check for pests' });
    }
  }

  // Add disease check actions (4 times a month)
  for (let i = 2; i <= totalDays; i++) {
    if (i % 8 === 0) {
      schedule.push({ day: `Day ${i}`, action: 'Check for diseases' });
    }
  }

  // Sort schedule by day for readability
  schedule.sort(
    (a, b) => parseInt(a.day.split(' ')[1]) - parseInt(b.day.split(' ')[1])
  );

  return schedule;
}
