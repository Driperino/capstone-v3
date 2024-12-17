import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request) {
  // Fetch user session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('leafmatrix'); // Your database name
    const plants = db.collection('plants');

    // Fetch plants for the current user
    const userPlants = await plants
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 }) // Sort by newest first
      .toArray();

    return new Response(JSON.stringify(userPlants), { status: 200 });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return new Response('Failed to fetch plants', { status: 500 });
  }
}

export async function POST(req: Request) {
  // Fetch user session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized: No active session' }),
      { status: 401 }
    );
  }

  try {
    // Safely parse the JSON body
    const rawBody = await req.text();
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      return new Response(
        JSON.stringify({ message: 'Invalid JSON in request body' }),
        { status: 400 }
      );
    }

    const { name, species, description, imageUrl } = body;

    // Validate required fields
    if (!name || !imageUrl) {
      return new Response(
        JSON.stringify({ message: 'Name and Image URL are required' }),
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('leafmatrix'); // Your database name
    const plants = db.collection('plants');

    // Insert new plant tied to the user ID
    const newPlant = {
      userId: session.user.id, // Associate with logged-in user
      name,
      species: species || 'Unknown', // Default species if not provided
      description: description || '',
      imageUrl,
      createdAt: new Date(),
    };

    const result = await plants.insertOne(newPlant);

    return new Response(
      JSON.stringify({
        message: 'Plant added successfully!',
        data: { ...newPlant, _id: result.insertedId },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding plant:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to add plant', error: error.message }),
      { status: 500 }
    );
  }
}
