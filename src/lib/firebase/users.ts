import type { ICreateUserDTO, IUpdateUserDTO, IUserDTO, IUserDocumentDTO } from "@/dtos/user.dto";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "./client";
import {
  type FirestoreUserDocument,
  mapUserDocument,
} from "./firestore-mappers";
import { getProductsByUserId } from "./products";

const USERS_COLLECTION = "users";

interface CreateUserProfileInput extends Omit<ICreateUserDTO, "password"> {
  avatarUrl?: string;
  credits?: number;
}

interface SyncAuthenticatedUserProfileInput {
  name: string;
  email: string;
  avatarUrl?: string;
}

function buildUserPayload(
  data: Partial<CreateUserProfileInput>,
): Partial<FirestoreUserDocument> {
  return {
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.email !== undefined ? { email: data.email } : {}),
    ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
    ...(data.credits !== undefined ? { credits: data.credits } : {}),
  };
}

export async function createUserProfile(
  userId: string,
  data: CreateUserProfileInput,
): Promise<IUserDocumentDTO> {
  const now = new Date();
  const userRef = doc(db, USERS_COLLECTION, userId);
  const payload: FirestoreUserDocument = {
    name: data.name,
    email: data.email,
    credits: data.credits ?? 0,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    ...(data.avatarUrl ? { avatarUrl: data.avatarUrl } : {}),
  };

  await setDoc(userRef, payload);

  return mapUserDocument(userRef.id, payload);
}

export async function getUserDocumentById(
  userId: string,
): Promise<IUserDocumentDTO | null> {
  const userSnapshot = await getDoc(doc(db, USERS_COLLECTION, userId));

  if (!userSnapshot.exists()) {
    return null;
  }

  return mapUserDocument(
    userSnapshot.id,
    userSnapshot.data() as FirestoreUserDocument,
  );
}

export async function getUserById(userId: string): Promise<IUserDTO | null> {
  const [userDocument, products] = await Promise.all([
    getUserDocumentById(userId),
    getProductsByUserId(userId),
  ]);

  if (!userDocument) {
    return null;
  }

  return {
    ...userDocument,
    products,
  };
}

export async function updateUserProfile(
  userId: string,
  data: IUpdateUserDTO,
): Promise<IUserDocumentDTO | null> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const payload = buildUserPayload(data);

  await updateDoc(userRef, {
    ...payload,
    updatedAt: new Date(),
  });

  return getUserDocumentById(userId);
}

export async function syncAuthenticatedUserProfile(
  userId: string,
  data: SyncAuthenticatedUserProfileInput,
): Promise<IUserDocumentDTO> {
  const existingUser = await getUserDocumentById(userId);

  if (!existingUser) {
    return createUserProfile(userId, {
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
    });
  }

  const updatedUser = await updateUserProfile(userId, {
    name: data.name,
    email: data.email,
    avatarUrl: data.avatarUrl,
  });

  if (!updatedUser) {
    throw new Error("Nao foi possivel sincronizar o perfil do usuario no Firestore.");
  }

  return updatedUser;
}
