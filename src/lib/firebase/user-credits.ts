import type { UserPlan } from "@/dtos/user.dto";

export const FREE_USER_CREDITS = 3;

export type PaidUserPlan = Exclude<UserPlan, null>;

export const PAID_USER_PLANS: PaidUserPlan[] = [
  "essential",
  "advanced",
  "professional",
];

export const PLAN_MONTHLY_CREDITS: Record<PaidUserPlan, number> = {
  essential: 100,
  advanced: 300,
  professional: 1000,
};

interface UserCreditInput {
  activePlan?: UserPlan;
  availableCredits?: number | null;
  consumedCredits?: number | null;
  credits?: number | null;
  lastPlanCreditMonth?: string | null;
  purchasedCredits?: number | null;
}

export interface NormalizedUserCredits {
  activePlan: UserPlan;
  availableCredits: number;
  consumedCredits: number;
  lastPlanCreditMonth: string | null;
}

function normalizeNonNegativeNumber(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value);
}

function normalizePlan(plan: UserPlan | string | undefined): UserPlan {
  return PAID_USER_PLANS.includes(plan as PaidUserPlan)
    ? (plan as PaidUserPlan)
    : null;
}

function normalizeMonthKey(monthKey: string | null | undefined) {
  if (typeof monthKey !== "string") {
    return null;
  }

  const normalizedMonthKey = monthKey.trim();

  return normalizedMonthKey.length > 0 ? normalizedMonthKey : null;
}

function calculateLegacyAvailableCredits(
  purchasedCredits: number | null | undefined,
  consumedCredits: number | null | undefined,
  credits: number | null | undefined,
) {
  const hasPurchasedCredits =
    typeof purchasedCredits === "number" || typeof consumedCredits === "number";

  if (hasPurchasedCredits) {
    return Math.max(
      0,
      FREE_USER_CREDITS +
        normalizeNonNegativeNumber(purchasedCredits) -
        normalizeNonNegativeNumber(consumedCredits),
    );
  }

  if (typeof credits === "number" && Number.isFinite(credits)) {
    return Math.max(0, credits);
  }

  return FREE_USER_CREDITS;
}

export function getMonthlyCreditsForPlan(plan: UserPlan) {
  if (!plan) {
    return 0;
  }

  return PLAN_MONTHLY_CREDITS[plan];
}

export function getCurrentCreditMonthKey(referenceDate = new Date()) {
  const year = referenceDate.getUTCFullYear();
  const month = `${referenceDate.getUTCMonth() + 1}`.padStart(2, "0");

  return `${year}-${month}`;
}

export function isPaidUserPlan(plan: UserPlan | string | undefined): plan is PaidUserPlan {
  return PAID_USER_PLANS.includes(plan as PaidUserPlan);
}

export function normalizeUserCredits({
  activePlan,
  availableCredits,
  consumedCredits,
  credits,
  lastPlanCreditMonth,
  purchasedCredits,
}: UserCreditInput): NormalizedUserCredits {
  const normalizedPlan = normalizePlan(activePlan);
  const normalizedConsumedCredits = normalizeNonNegativeNumber(consumedCredits);
  const normalizedLastPlanCreditMonth = normalizeMonthKey(lastPlanCreditMonth);

  if (typeof availableCredits === "number" && Number.isFinite(availableCredits)) {
    return {
      activePlan: normalizedPlan,
      availableCredits: Math.max(0, availableCredits),
      consumedCredits: normalizedConsumedCredits,
      lastPlanCreditMonth: normalizedLastPlanCreditMonth,
    };
  }

  return {
    activePlan: normalizedPlan,
    availableCredits: calculateLegacyAvailableCredits(
      purchasedCredits,
      consumedCredits,
      credits,
    ),
    consumedCredits: normalizedConsumedCredits,
    lastPlanCreditMonth: normalizedLastPlanCreditMonth,
  };
}

export function applyCreditConsumption(
  currentCredits: NormalizedUserCredits,
  creditsToConsume = 1,
): NormalizedUserCredits {
  if (creditsToConsume <= 0) {
    return currentCredits;
  }

  if (currentCredits.availableCredits < creditsToConsume) {
    throw new Error("Voce nao possui creditos suficientes para gerar uma imagem.");
  }

  return {
    ...currentCredits,
    availableCredits: currentCredits.availableCredits - creditsToConsume,
    consumedCredits: currentCredits.consumedCredits + creditsToConsume,
  };
}

export function applyCreditRefund(
  currentCredits: NormalizedUserCredits,
  creditsToRefund = 1,
): NormalizedUserCredits {
  if (creditsToRefund <= 0) {
    return currentCredits;
  }

  if (currentCredits.consumedCredits < creditsToRefund) {
    throw new Error("Nao foi possivel restaurar os creditos do usuario.");
  }

  return {
    ...currentCredits,
    availableCredits: currentCredits.availableCredits + creditsToRefund,
    consumedCredits: currentCredits.consumedCredits - creditsToRefund,
  };
}

export function applyPlanPurchaseOrUpgrade(
  currentCredits: NormalizedUserCredits,
  plan: PaidUserPlan,
  monthKey = getCurrentCreditMonthKey(),
): NormalizedUserCredits {
  if (
    currentCredits.activePlan === plan &&
    currentCredits.lastPlanCreditMonth === monthKey
  ) {
    return currentCredits;
  }

  return {
    ...currentCredits,
    activePlan: plan,
    availableCredits:
      currentCredits.availableCredits + getMonthlyCreditsForPlan(plan),
    lastPlanCreditMonth: monthKey,
  };
}

export function shouldGrantMonthlyPlanCredits(
  currentCredits: NormalizedUserCredits,
  monthKey = getCurrentCreditMonthKey(),
) {
  return Boolean(
    currentCredits.activePlan &&
      currentCredits.lastPlanCreditMonth !== monthKey,
  );
}

export function applyMonthlyPlanCredits(
  currentCredits: NormalizedUserCredits,
  monthKey = getCurrentCreditMonthKey(),
): NormalizedUserCredits {
  if (!shouldGrantMonthlyPlanCredits(currentCredits, monthKey)) {
    return currentCredits;
  }

  return {
    ...currentCredits,
    availableCredits:
      currentCredits.availableCredits +
      getMonthlyCreditsForPlan(currentCredits.activePlan),
    lastPlanCreditMonth: monthKey,
  };
}
