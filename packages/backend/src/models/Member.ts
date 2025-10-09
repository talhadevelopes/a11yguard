import mongoose, { Schema, Document } from 'mongoose';

export enum MemberType {
  Admin = 'Admin',
  Member = 'Member'
}

export interface IMember extends Document {
  _id: string;
  userId: string;
  memberId: string;
  name: string;
  role: string;
  type: MemberType;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  memberId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  role: {
    type: String,
    required: true,
    maxlength: 50,
  },
  type: {
    type: String,
    enum: Object.values(MemberType),
    default: MemberType.Member,
  },
}, {
  timestamps: true,
  collection: 'members'
});

// Add indexes and unique constraints
MemberSchema.index({ userId: 1, memberId: 1 }, { unique: true });
MemberSchema.index({ type: 1 });

export const Member = mongoose.model<IMember>('Member', MemberSchema);
