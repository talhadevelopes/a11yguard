import mongoose, { Schema, Document } from 'mongoose';

export interface IWebsite extends Document {
  _id: string;
  url: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

const WebsiteSchema = new Schema<IWebsite>({
  url: {
    type: String,
    required: true,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  collection: 'websites'
});

WebsiteSchema.index({ url: 1, userId: 1 }, { unique: true });
WebsiteSchema.index({ isActive: 1 });

export const Website = mongoose.model<IWebsite>('Website', WebsiteSchema);
