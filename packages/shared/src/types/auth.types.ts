export type MemberType = "Admin" | "Member";

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


// frontend
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
