export interface MemberProfile {
  memberId: string
  name: string
  role: string
  type: "Admin" | "Member"
}

export interface User {
  userId: string;
  email?: string;
  onboarded?: boolean;
  memberId?: string;
  memberType?: "Admin" | "Member";
}

export interface LoginResponse {
  token: string;
  userId: string;
  onboarded: boolean;
  memberId?: string;
  memberType?: "Admin" | "Member";
  members?: MemberProfile[];
}

export interface RegisterResponse {
  token: string;
  userId: string;
  onboarded: boolean;
  memberId?: string;
  memberType?: "Admin" | "Member";
}

export interface SelectMemberResponse {
  token: string;
  userId: string;
  onboarded: boolean;
  memberId: string;
  memberType: "Admin" | "Member";
}

export interface OnboardResponse {
  token: string;
  onboarded: boolean;
  member: {
    memberId: string;
    type: "Admin" | "Member";
  };
}
