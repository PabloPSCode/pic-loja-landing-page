import type { IProductDocumentDTO } from "@/dtos/product.dto";
import type { IUserDocumentDTO } from "@/dtos/user.dto";
import { Timestamp } from "firebase/firestore";

import { clampProductImageScale } from "../product-image-scale";
import { normalizeUserCredits } from "./user-credits";

export interface FirestoreUserDocument {
  name: string;
  email: string;
  avatarUrl?: string;
  activePlan?: IUserDocumentDTO["activePlan"];
  availableCredits?: number;
  consumedCredits?: number;
  credits?: number;
  lastPlanCreditMonth?: string | null;
  purchasedCredits?: number;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  deletedAt?: Date | Timestamp | null;
}

export interface FirestoreProductDocument {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imageScale?: number;
  userId: string;
  bgColor: string;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

function toDate(value: Date | Timestamp | null | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value;
  }

  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (typeof value === "object" && value !== null) {
    const timestampLike = value as { toDate?: unknown };

    if (typeof timestampLike.toDate === "function") {
      return timestampLike.toDate();
    }
  }

  return new Date(value);
}

export function mapUserDocument(
  id: string,
  data: FirestoreUserDocument,
): IUserDocumentDTO {
  const normalizedCredits = normalizeUserCredits(data);

  return {
    id,
    name: data.name,
    email: data.email,
    avatarUrl: data.avatarUrl,
    activePlan: normalizedCredits.activePlan,
    availableCredits: normalizedCredits.availableCredits,
    consumedCredits: normalizedCredits.consumedCredits,
    lastPlanCreditMonth: normalizedCredits.lastPlanCreditMonth,
    createdAt: toDate(data.createdAt) ?? new Date(),
    updatedAt: toDate(data.updatedAt) ?? new Date(),
    deletedAt: toDate(data.deletedAt),
  };
}

export function mapProductDocument(
  id: string,
  data: FirestoreProductDocument,
): IProductDocumentDTO {
  return {
    id,
    title: data.title,
    description: data.description,
    price: data.price,
    imageUrl: data.imageUrl,
    imageScale: clampProductImageScale(data.imageScale),
    userId: data.userId,
    bgColor: data.bgColor,
    createdAt: toDate(data.createdAt) ?? new Date(),
    updatedAt: toDate(data.updatedAt) ?? new Date(),
  };
}
