export interface AccessibilityIssueDTO {
  id?: string;
  snapshotId?: string;
  type: string;
  message: string;
  source?: string | null;
  context?: string | null;
  selector?: string | null;
}

//frontend
export interface AccessibilityIssue {
  severity: string;
  type?: string; 
  message?: string; 
  description?: string;
  source?: string;
  context?: string;
  selector?: string;
}