import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const plantId = params.id; // Destructure `id` from params

  if (!plantId || !ObjectId.isValid(plantId)) {
    return NextResponse.json({ message: 'Invalid plant ID' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('leafmatrix');
    const plants = db.collection('plants');

    // Delete plant by ID
    const result = await plants.deleteOne({ _id: new ObjectId(plantId) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Plant not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Plant deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting plant:', error);
    return NextResponse.json(
      { message: 'Failed to delete plant', error: error.message },
      { status: 500 }
    );
  }
}
