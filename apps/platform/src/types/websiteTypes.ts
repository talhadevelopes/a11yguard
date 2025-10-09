//website related
export interface Website {
  id: string
  name: string
  url: string
  isActive?: boolean
  createdAt: string
  updatedAt?: string
  latestSnapshot?: string | null
}

export interface Snapshot {
  id: string
  website?: string
  content: string
  capturedAt: string
  contentPreview?: string
  interactiveElements?: {
    buttons: any[]
    links: any[]
    inputs: any[]
    forms: any[]
  }
  accessibilityIssues?: AccessibilityIssue[]
  analyzedAt?: string | null
  metadata?: {
    elementCounts?: {
      headings: number
      paragraphs: number
      links: number
      inputs: number
      buttons: number
      forms: number
    }
    performance?: {
      captureTime: number
      totalElements: number
      elementsPerSecond: number
    }
  }
}

// types/websiteTypes.ts (add this interface)
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


export interface AccessibilityIssue {
  severity: string
  type?: string // Matches 'type' in your backend model
  message?: string // Matches 'message' in your backend model
  description?: string,
  source?: string
  context?: string
  selector?: string
  // severity is NOT present in your backend Snapshot model's accessibilityIssues array.
  // If you need severity for automated issues, you must add it to your backend Snapshot schema.
}

// Define the DiffType enum (or union type)
export type DiffType = "lines" | "words" | "chars"


export interface AggregatedWebsiteData {
  totalSnapshots: number
  totalAccessibilityIssues: number
  // Removed accessibilityIssuesBySeverity for automated issues as 'severity' is not in backend Snapshot model
  accessibilityIssuesByType: Record<string, number>
  totalInteractiveElements: {
    buttons: number
    links: number
    inputs: number
    forms: number
  }
}