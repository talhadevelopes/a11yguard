import mongoose, { Schema, Document } from 'mongoose';

export type ChatType = 'group' | 'dm';

export interface IChatMessage extends Document {
  _id: string;
  userId: string; // organization/team scope
  type: ChatType;
  fromMemberId: string;
  toMemberId?: string; // only for dm
  conversationId?: string; // only for dm (sorted pair key)
  content: string;
  createdAt: Date;
  readBy?: string[];
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    userId: { type: String, required: true, index: true },
    type: { type: String, enum: ['group', 'dm'], required: true, index: true },
    fromMemberId: { type: String, required: true },
    toMemberId: { type: String },
    conversationId: { type: String, index: true },
    content: { type: String, required: true, maxlength: 5000 },
    readBy: { type: [String], default: [] },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'chat_messages',
  }
);

ChatMessageSchema.index({ userId: 1, type: 1, createdAt: -1 });
ChatMessageSchema.index({ conversationId: 1, createdAt: -1 });

export const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
