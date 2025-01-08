import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { authOptions } from '@/lib/authOptions';
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
        updatedFields.imageUrl = faker.image.urlPicsumPhotos({
          width: 200,
          height: 200,
        });
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
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { message: 'Failed to fetch plants', error: errorMessage },
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
      imageUrl:
        imageUrl || faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
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
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { message: 'Failed to add plant', error: errorMessage },
      { status: 500 }
    );
  }
}

// Helper function to generate a fake care schedule for a plant with variability
function generateFakeCareSchedule() {
  const schedule = [];
  const totalDays = 30;

  const randomizeDay = (baseDay: number, range: number): number =>
    baseDay + Math.floor(Math.random() * range);

  // Add watering actions with variability
  for (let i = 1; i <= totalDays; i++) {
    if (i % 3 === 0) {
      schedule.push({
        day: `Day ${randomizeDay(i, 2)}`, // Randomize by ±1 day
        action: 'Water the plant',
      });
    }
  }

  // Add fertilizing action with slight variability
  schedule.push({
    day: `Day ${randomizeDay(1, 3)}`, // Randomize between Day 1 and Day 3
    action: 'Apply fertilizer',
  });

  // Add pest check actions with variability
  for (let i = 1; i <= totalDays; i++) {
    if (i % 7 === 0) {
      schedule.push({
        day: `Day ${randomizeDay(i, 2)}`, // Randomize by ±1 day
        action: 'Check for pests',
      });
    }
  }

  // Add disease check actions with variability
  for (let i = 2; i <= totalDays; i++) {
    if (i % 8 === 0) {
      schedule.push({
        day: `Day ${randomizeDay(i, 2)}`, // Randomize by ±1 day
        action: 'Check for diseases',
      });
    }
  }

  // Shuffle the schedule for added randomness
  for (let i = schedule.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [schedule[i], schedule[j]] = [schedule[j], schedule[i]];
  }

  // Sort the schedule to ensure days are in ascending order
  schedule.sort(
    (a, b) => parseInt(a.day.split(' ')[1]) - parseInt(b.day.split(' ')[1])
  );

  return schedule;
}
