import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    timezone: { type: String },
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.User || model('User', UserSchema);
