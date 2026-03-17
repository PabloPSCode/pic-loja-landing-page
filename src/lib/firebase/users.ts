import type {
  ICreateUserDTO,
  IUpdateUserDTO,
  IUserDTO,
  IUserDocumentDTO,
  UserPlan,
} from "@/dtos/user.dto";
import { doc, getDoc, runTransaction, setDoc, updateDoc } from "firebase/firestore";

import { auth } from "./auth";
import { db } from "./client";
import {
  type FirestoreUserDocument,
  mapUserDocument,
} from "./firestore-mappers";
import { getProductsByUserId } from "./products";
import {
  applyCreditConsumption,
  applyCreditRefund,
  FREE_USER_CREDITS,
  type PaidUserPlan,
  normalizeUserCredits,
} from "./user-credits";

const USERS_COLLECTION = "users";

interface CreateUserProfileInput extends Omit<ICreateUserDTO, "password"> {
  activePlan?: UserPlan;
  avatarUrl?: string;
  availableCredits?: number;
  consumedCredits?: number;
  lastPlanCreditMonth?: string | null;
}

interface SyncAuthenticatedUserProfileInput {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface SerializedUserDocument
  extends Omit<IUserDocumentDTO, "createdAt" | "updatedAt" | "deletedAt"> {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;
}

interface UpgradePlanResponsePayload {
  error?: string;
  user?: SerializedUserDocument;
}

export async function getAuthenticatedUserProfile(
  userId: string,
): Promise<IUserDocumentDTO> {
  const userDocument = await getUserDocumentById(userId);

  if (!userDocument) {
    throw new Error("Perfil do usuario nao foi encontrado no Firestore.");
  }

  return userDocument;
}

function buildUserPayload(
  data: Partial<CreateUserProfileInput>,
): Partial<FirestoreUserDocument> {
  return {
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.email !== undefined ? { email: data.email } : {}),
    ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
    ...(data.activePlan !== undefined ? { activePlan: data.activePlan } : {}),
    ...(data.availableCredits !== undefined
      ? { availableCredits: data.availableCredits }
      : {}),
    ...(data.consumedCredits !== undefined
      ? { consumedCredits: data.consumedCredits }
      : {}),
    ...(data.lastPlanCreditMonth !== undefined
      ? { lastPlanCreditMonth: data.lastPlanCreditMonth }
      : {}),
  };
}

function deserializeUserDocument(
  serializedUser: SerializedUserDocument,
): IUserDocumentDTO {
  return {
    ...serializedUser,
    createdAt: new Date(serializedUser.createdAt),
    deletedAt: serializedUser.deletedAt
      ? new Date(serializedUser.deletedAt)
      : undefined,
    updatedAt: new Date(serializedUser.updatedAt),
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
    activePlan: data.activePlan ?? null,
    availableCredits: data.availableCredits ?? FREE_USER_CREDITS,
    consumedCredits: data.consumedCredits ?? 0,
    lastPlanCreditMonth: data.lastPlanCreditMonth ?? null,
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

async function updateUserCreditsByDelta(
  userId: string,
  delta: number,
): Promise<IUserDocumentDTO> {
  const userRef = doc(db, USERS_COLLECTION, userId);

  return runTransaction(db, async (transaction) => {
    const userSnapshot = await transaction.get(userRef);

    if (!userSnapshot.exists()) {
      throw new Error("Perfil do usuario nao foi encontrado no Firestore.");
    }

    const currentUser = userSnapshot.data() as FirestoreUserDocument;
    const normalizedCredits = normalizeUserCredits(currentUser);
    const nextCredits =
      delta > 0
        ? applyCreditConsumption(normalizedCredits, delta)
        : applyCreditRefund(normalizedCredits, Math.abs(delta));
    const updatedAt = new Date();

    transaction.update(userRef, {
      activePlan: nextCredits.activePlan,
      availableCredits: nextCredits.availableCredits,
      consumedCredits: nextCredits.consumedCredits,
      lastPlanCreditMonth: nextCredits.lastPlanCreditMonth,
      updatedAt,
    });

    return mapUserDocument(userSnapshot.id, {
      ...currentUser,
      activePlan: nextCredits.activePlan,
      availableCredits: nextCredits.availableCredits,
      consumedCredits: nextCredits.consumedCredits,
      lastPlanCreditMonth: nextCredits.lastPlanCreditMonth,
      updatedAt,
    });
  });
}

export async function consumeUserCredit(
  userId: string,
): Promise<IUserDocumentDTO> {
  return updateUserCreditsByDelta(userId, 1);
}

export async function refundUserCredit(
  userId: string,
): Promise<IUserDocumentDTO> {
  return updateUserCreditsByDelta(userId, -1);
}

export async function syncAuthenticatedUserProfile(
  userId: string,
  data: SyncAuthenticatedUserProfileInput,
): Promise<IUserDocumentDTO> {
  const userRef = doc(db, USERS_COLLECTION, userId);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return createUserProfile(userId, {
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
    });
  }

  const currentUser = userSnapshot.data() as FirestoreUserDocument;
  const normalizedCredits = normalizeUserCredits(currentUser);
  const updatedUser = await updateUserProfile(userId, {
    name: data.name,
    email: data.email,
    avatarUrl: data.avatarUrl,
    activePlan: normalizedCredits.activePlan,
    availableCredits: normalizedCredits.availableCredits,
    consumedCredits: normalizedCredits.consumedCredits,
    lastPlanCreditMonth: normalizedCredits.lastPlanCreditMonth,
  });

  if (!updatedUser) {
    throw new Error("Nao foi possivel sincronizar o perfil do usuario no Firestore.");
  }

  return updatedUser;
}

export async function upgradeAuthenticatedUserPlan(
  plan: PaidUserPlan,
): Promise<IUserDocumentDTO> {
  const authenticatedUser = auth.currentUser;

  if (!authenticatedUser) {
    throw new Error("Faça login novamente antes de alterar o plano.");
  }

  const idToken = await authenticatedUser.getIdToken();
  const response = await fetch("/api/users/plan/upgrade", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan }),
  });

  const payload = (await response
    .json()
    .catch(() => null)) as UpgradePlanResponsePayload | null;

  if (!response.ok || !payload?.user) {
    throw new Error(
      payload?.error ??
        "Nao foi possivel atualizar o plano do usuario no momento.",
    );
  }

  return deserializeUserDocument(payload.user);
}

export { FREE_USER_CREDITS };
