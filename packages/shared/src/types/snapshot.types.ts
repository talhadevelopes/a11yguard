import { AccessibilityIssue } from "./accessibility.types";

export interface SnapshotDTO {
  id: string;
  websiteId: string;
  userId: string;
  content: string;
  capturedAt: string;
  contentPreview?: string | null;
  analyzedAt?: string | null;
  title?: string | null;
  url?: string | null;
}

//frontend
export interface Snapshot {
  id: string;
  website?: string;
  content: string;
  capturedAt: string;
  contentPreview?: string;
  interactiveElements?: {
    buttons: any[];
    links: any[];
    inputs: any[];
    forms: any[];
  };
  accessibilityIssues?: AccessibilityIssue[];
  analyzedAt?: string | null;
  metadata?: {
    elementCounts?: {
      headings: number;
      paragraphs: number;
      links: number;
      inputs: number;
      buttons: number;
      forms: number;
    };
    performance?: {
      captureTime: number;
      totalElements: number;
      elementsPerSecond: number;
    };
  };
}

export interface SnapshotDiff {
  older: string;
  newer: string;
  changes: Array<{
    value: string;
    added?: boolean;
    removed?: boolean;
  }>;
  structuredChanges?: {
    headingsChanged: number;
    paragraphsChanged: number;
    linksChanged: number;
  };
  summary?: {
    totalChanges: number;
  };
}