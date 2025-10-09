import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  onboarded: boolean;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  collection: 'users'
});

// Add indexes
UserSchema.index({ createdAt: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
