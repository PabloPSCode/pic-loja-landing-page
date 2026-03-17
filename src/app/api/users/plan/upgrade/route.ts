import type { IUserDocumentDTO } from "@/dtos/user.dto";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import {
  type FirestoreUserDocument,
  mapUserDocument,
} from "@/lib/firebase/firestore-mappers";
import {
  applyPlanPurchaseOrUpgrade,
  getCurrentCreditMonthKey,
  isPaidUserPlan,
  type PaidUserPlan,
  normalizeUserCredits,
} from "@/lib/firebase/user-credits";
import { NextRequest, NextResponse } from "next/server";

const USERS_COLLECTION = "users";

interface SerializedUserDocument
  extends Omit<IUserDocumentDTO, "createdAt" | "updatedAt" | "deletedAt"> {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;
}

function getBearerToken(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice("Bearer ".length).trim();
}

function serializeUserDocument(user: IUserDocumentDTO): SerializedUserDocument {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    deletedAt: user.deletedAt?.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

async function updateUserPlan(
  userId: string,
  plan: PaidUserPlan,
): Promise<IUserDocumentDTO> {
  const userRef = adminDb.collection(USERS_COLLECTION).doc(userId);

  return adminDb.runTransaction(async (transaction) => {
    const userSnapshot = await transaction.get(userRef);

    if (!userSnapshot.exists) {
      throw new Error("Perfil do usuario nao foi encontrado no Firestore.");
    }

    const currentUser = userSnapshot.data() as FirestoreUserDocument;
    const updatedAt = new Date();
    const nextCredits = applyPlanPurchaseOrUpgrade(
      normalizeUserCredits(currentUser),
      plan,
      getCurrentCreditMonthKey(updatedAt),
    );

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

export async function POST(request: NextRequest) {
  try {
    const idToken = getBearerToken(request);

    if (!idToken) {
      return NextResponse.json(
        { error: "Token de autenticacao nao foi informado." },
        { status: 401 },
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const payload = (await request
      .json()
      .catch(() => null)) as { plan?: string } | null;

    if (!isPaidUserPlan(payload?.plan)) {
      return NextResponse.json(
        { error: "O plano informado e invalido." },
        { status: 400 },
      );
    }

    const user = await updateUserPlan(decodedToken.uid, payload.plan);

    return NextResponse.json({
      user: serializeUserDocument(user),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Nao foi possivel atualizar o plano do usuario.",
      },
      { status: 500 },
    );
  }
}
