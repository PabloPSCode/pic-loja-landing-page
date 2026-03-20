import type { IUserDocumentDTO } from "@/dtos/user.dto";

import { adminDb } from "./admin";
import {
  type FirestoreUserDocument,
  mapUserDocument,
} from "./firestore-mappers";
import {
  applyPlanPurchaseOrUpgrade,
  getCurrentCreditMonthKey,
  type PaidUserPlan,
  normalizeUserCredits,
} from "./user-credits";

const USERS_COLLECTION = "users";

export async function upgradeUserPlanById(
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
