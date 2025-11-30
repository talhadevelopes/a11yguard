export interface WebsiteDTO {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  latestSnapshot?: string | null;
  //mock for frontend
  isActive?: boolean;
  updatedAt?: string;
}

//for dashboard frontend
export interface AggregatedWebsiteData {
  totalSnapshots: number;
  totalAccessibilityIssues: number;
  accessibilityIssuesByType: Record<string, number>;
  totalInteractiveElements: {
    buttons: number;
    links: number;
    inputs: number;
    forms: number;
  };
}
