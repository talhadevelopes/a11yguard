import type { Website } from "./websiteTypes";
//Report
export interface ManualIssue {
  id: string;
  title: string;
  description: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  assignedTo: string;
  dueDate: string;
  website: string;
}

//member
export interface Member {
  isActive: unknown;
  memberId: string;
  userId: string; 
  name: string;
  role: string;
  type: "Admin" | "Member";
  createdAt: string;
  updatedAt: string;
}

//api
export interface ApiResponse {
  members?: Member[];
  member?: Member;
  message?: string;
  error?: string;
  websites?: Website[];
  website?: Website;
}
