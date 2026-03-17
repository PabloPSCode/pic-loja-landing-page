import { adminDb } from "@/lib/firebase/admin";
import { type FirestoreUserDocument } from "@/lib/firebase/firestore-mappers";
import {
  applyMonthlyPlanCredits,
  getCurrentCreditMonthKey,
  PAID_USER_PLANS,
  shouldGrantMonthlyPlanCredits,
  normalizeUserCredits,
} from "@/lib/firebase/user-credits";
import type { DocumentReference } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

const USERS_COLLECTION = "users";
const BATCH_LIMIT = 450;

export const dynamic = "force-dynamic";

function isAuthorizedCronRequest(request: NextRequest) {
  const configuredSecret = process.env.CRON_SECRET;

  if (!configuredSecret) {
    return true;
  }

  const authorizationHeader = request.headers.get("authorization");
  const bearerToken = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.slice("Bearer ".length).trim()
    : null;
  const headerSecret = request.headers.get("x-cron-secret");

  return bearerToken === configuredSecret || headerSecret === configuredSecret;
}

async function grantMonthlyPlanCredits() {
  const currentMonthKey = getCurrentCreditMonthKey();
  const usersSnapshot = await adminDb
    .collection(USERS_COLLECTION)
    .where("activePlan", "in", PAID_USER_PLANS)
    .get();

  const updates: Array<{
    data: Partial<FirestoreUserDocument>;
    ref: DocumentReference;
  }> = [];

  for (const userDocument of usersSnapshot.docs) {
    const currentUser = userDocument.data() as FirestoreUserDocument;
    const normalizedCredits = normalizeUserCredits(currentUser);

    if (!shouldGrantMonthlyPlanCredits(normalizedCredits, currentMonthKey)) {
      continue;
    }

    const updatedAt = new Date();
    const nextCredits = applyMonthlyPlanCredits(
      normalizedCredits,
      currentMonthKey,
    );

    updates.push({
      data: {
        activePlan: nextCredits.activePlan,
        availableCredits: nextCredits.availableCredits,
        consumedCredits: nextCredits.consumedCredits,
        lastPlanCreditMonth: nextCredits.lastPlanCreditMonth,
        updatedAt,
      },
      ref: userDocument.ref,
    });
  }

  for (let index = 0; index < updates.length; index += BATCH_LIMIT) {
    const batch = adminDb.batch();

    for (const update of updates.slice(index, index + BATCH_LIMIT)) {
      batch.update(update.ref, update.data);
    }

    await batch.commit();
  }

  return {
    grantedUsers: updates.length,
    month: currentMonthKey,
    processedUsers: usersSnapshot.size,
  };
}

async function handleCronRequest(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json(
      { error: "Cron secret invalido." },
      { status: 401 },
    );
  }

  try {
    const result = await grantMonthlyPlanCredits();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Nao foi possivel creditar os planos mensais.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return handleCronRequest(request);
}

export async function POST(request: NextRequest) {
  return handleCronRequest(request);
}
