import mongoose, { Schema, Document } from 'mongoose';

export interface ISnapshot extends Document {
  _id: string;
  websiteId: string;
  userId: string;
  capturedAt: Date;
  contentPreview?: string;
  contentCompressed?: Buffer;
  contentEncoding?: string;
  contentSize?: number;
  contentCompressedSize?: number;
  metadataCompressed?: Buffer;
  metadataEncoding?: string;
  metadataSize?: number;
  metadataCompressedSize?: number;
  analyzedAt?: Date;
  title?: string;
  url?: string;
  changesOnly?: any;
  createdAt: Date;
  updatedAt: Date;
}

const SnapshotSchema = new Schema<ISnapshot>({
  websiteId: {
    type: String,
    required: true,
    ref: 'Website'
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  capturedAt: {
    type: Date,
    default: Date.now,
  },
  contentPreview: {
    type: String,
  },
  contentCompressed: {
    type: Buffer,
  },
  contentEncoding: {
    type: String,
    maxlength: 20,
  },
  contentSize: {
    type: Number,
  },
  contentCompressedSize: {
    type: Number,
  },
  metadataCompressed: {
    type: Buffer,
  },
  metadataEncoding: {
    type: String,
    maxlength: 20,
  },
  metadataSize: {
    type: Number,
  },
  metadataCompressedSize: {
    type: Number,
  },
  analyzedAt: {
    type: Date,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
    maxlength: 255,
  },
  changesOnly: {
    type: Schema.Types.Mixed,
  },
}, {
  timestamps: true,
  collection: 'snapshots'
});

SnapshotSchema.index({ websiteId: 1 });
SnapshotSchema.index({ userId: 1 });
SnapshotSchema.index({ capturedAt: 1 });

export const Snapshot = mongoose.model<ISnapshot>('Snapshot', SnapshotSchema);
