import mongoose, { Schema, Document } from 'mongoose';

export interface IAccessibilityIssue extends Document {
  _id: string;
  snapshotId: string;
  type: string;
  message: string;
  source?: string;
  context?: string;
  selector?: string;
}

const AccessibilityIssueSchema = new Schema<IAccessibilityIssue>({
  snapshotId: {
    type: String,
    required: true,
    ref: 'Snapshot'
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  context: {
    type: String,
  },
  selector: {
    type: String,
  },
}, {
  timestamps: false,
  collection: 'accessibility_issues'
});

AccessibilityIssueSchema.index({ snapshotId: 1 });
AccessibilityIssueSchema.index({ type: 1 });

export const AccessibilityIssue = mongoose.model<IAccessibilityIssue>('AccessibilityIssue', AccessibilityIssueSchema);
