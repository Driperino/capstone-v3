import mongoose, { Schema, model, models } from 'mongoose';

// Define the schema
const plantSchema = new Schema(
  {
    userId: { type: String, required: true }, // Associate with the logged-in user
    name: { type: String, required: true },
    species: { type: String, default: 'Unknown' },
    description: { type: String },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'plants' }
);

// Export the model (handles model reuse with Mongoose)
export const Plant = models.Plant || model('Plant', plantSchema);
