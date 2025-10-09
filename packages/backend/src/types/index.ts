// Local backend DTOs and API envelope types (mirroring shared shape)
export type MemberType = "Admin" | "Member";

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

export interface WebsiteDTO {
  id: string;
  url: string;
  name: string;
  createdAt: string;
  latestSnapshot?: string | null;
}

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
  type: string;
  message: string;
  source?: string | null;
  context?: string | null;
  selector?: string | null;
}

// Local request type for chat feature
export interface ChatRequest {
  textContent: string;
  question: string;
  url: string;
  expertType?: "health" | "fact-checker" | "tech";
}