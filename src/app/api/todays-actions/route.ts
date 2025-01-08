import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { authOptions } from '@/lib/authOptions';

export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('leafmatrix');
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];

    // Fetch all plants for the user
    const plants = await db
      .collection('plants')
      .find({ userId: session.user.id })
      .toArray();

    // Collect all actions for today
    const todaysActions = plants.flatMap((plant) =>
      plant.careSchedule
        .map((task: { day: string; action: string }) => {
          const actionDate = new Date(plant.datePlanted);
          actionDate.setDate(
            actionDate.getDate() + parseInt(task.day.replace('Day ', '')) - 1
          );
          return {
            ...task,
            plant: {
              _id: plant._id,
              name: plant.name,
              species: plant.species,
            },
            actionDate: actionDate.toISOString().split('T')[0],
          };
        })
        .filter((task: { actionDate: string }) => task.actionDate === todayISO)
    );

    return NextResponse.json(todaysActions, { status: 200 });
  } catch (error) {
    console.error("Error fetching today's actions:", error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
