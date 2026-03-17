import type { IProductDTO } from "./product.dto";

export type UserPlan = "essential" | "advanced" | "professional" | null;

export interface IUserDocumentDTO {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  activePlan: UserPlan;
  availableCredits: number;
  consumedCredits: number;
  lastPlanCreditMonth: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IUserDTO extends IUserDocumentDTO {
  // Products are loaded from the products collection by userId.
  products: IProductDTO[];
}

export interface ICreateUserDTO {
  name: string;
  email: string;
  // Used by Firebase Auth account creation. Do not store it in Firestore.
  password: string;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
  activePlan?: UserPlan;
  availableCredits?: number;
  consumedCredits?: number;
  lastPlanCreditMonth?: string | null;
}
