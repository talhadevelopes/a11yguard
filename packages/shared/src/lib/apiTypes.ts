// Shared API response types and DTOs for both backend and frontend

export type MemberType = "Admin" | "Member";

// Standard API response envelope
export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
  meta?: Record<string, any>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: any;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Auth-related DTOs
export interface MemberDTO {
  memberId: string;
  name: string;
  role: string;
  type: MemberType;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterDTO {
  userId: string;
  onboarded: boolean;
  token: string;
}

export interface LoginSingleMemberDTO {
  token: string;
  userId: string;
  onboarded: boolean;
  memberId: string;
  memberType: MemberType;
}

export interface LoginMultipleMembersDTO {
  userId: string;
  onboarded: boolean;
  members: MemberDTO[];
}

export interface SelectMemberDTO {
  token: string;
  userId: string;
  memberId: string;
  memberType: MemberType;
  onboarded: boolean;
}

// Website-related DTOs
export interface WebsiteDTO {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  latestSnapshot?: string | null;
}

// Snapshot and accessibility-related DTOs (minimal for now)
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

export interface AccessibilityIssueDTO {
  id?: string;
  snapshotId?: string;
  type: string; // could be narrowed later
  message: string;
  source?: string | null;
  context?: string | null;
  selector?: string | null;
}
