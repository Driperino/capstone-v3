import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { ObjectId } from 'mongodb';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  await dbConnect();

  try {
    const { name, email, timezone, image } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, timezone, image },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  await dbConnect();

  try {
    // Delete the user
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Identify and delete related objects tied to the user
    const client = await clientPromise; // Assuming you're using the MongoDB client
    const db = client.db('leafmatrix'); // Replace with your database name

    // Delete related objects in "plants" collection (or other relevant collections)
    const relatedResult = await db.collection('plants').deleteMany({
      userId: new ObjectId(id),
    });

    console.log(
      `Deleted ${relatedResult.deletedCount} related objects for user ID: ${id}`
    );

    return NextResponse.json(
      {
        message: 'User and related objects deleted successfully',
        userId: id,
        deletedObjectsCount: relatedResult.deletedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user and related objects:', error);
    return NextResponse.json(
      { error: 'Failed to delete user and related objects' },
      { status: 500 }
    );
  }
}
