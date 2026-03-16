import type { IProductDocumentDTO } from "@/dtos/product.dto";
import type { IUserDocumentDTO } from "@/dtos/user.dto";
import { Timestamp } from "firebase/firestore";

export interface FirestoreUserDocument {
  name: string;
  email: string;
  avatarUrl?: string;
  credits: number;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  deletedAt?: Date | Timestamp | null;
}

export interface FirestoreProductDocument {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
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

  return new Date(value);
}

export function mapUserDocument(
  id: string,
  data: FirestoreUserDocument,
): IUserDocumentDTO {
  return {
    id,
    name: data.name,
    email: data.email,
    avatarUrl: data.avatarUrl,
    credits: data.credits,
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
    userId: data.userId,
    bgColor: data.bgColor,
    createdAt: toDate(data.createdAt) ?? new Date(),
    updatedAt: toDate(data.updatedAt) ?? new Date(),
  };
}
