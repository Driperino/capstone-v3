import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// DELETE handler for deleting a plant
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id: plantId } = await context.params;

    if (!ObjectId.isValid(plantId)) {
      return NextResponse.json(
        { message: 'Invalid plant ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leafmatrix');

    const result = await db.collection('plants').deleteOne({
      _id: new ObjectId(plantId),
      userId: session.user.id, // Using the string ID directly as stored in the plants collection
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Plant not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Plant deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting plant:', error);
    return NextResponse.json(
      { message: 'Failed to delete plant' },
      { status: 500 }
    );
  }
}

// PATCH handler for updating a plant
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id: plantId } = await context.params;
    const body = await req.json();

    if (!ObjectId.isValid(plantId)) {
      return NextResponse.json(
        { message: 'Invalid plant ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leafmatrix');

    const update = {
      $set: { ...body },
    };

    const result = await db
      .collection('plants')
      .updateOne(
        { _id: new ObjectId(plantId), userId: session.user.id },
        update
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Plant not found' }, { status: 404 });
    }

    const updatedPlant = await db
      .collection('plants')
      .findOne({ _id: new ObjectId(plantId) });

    return NextResponse.json(
      { message: 'Plant updated successfully', data: updatedPlant },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating plant:', error);
    return NextResponse.json(
      { message: 'Failed to delete plant' },
      { status: 500 }
    );
  }
}
