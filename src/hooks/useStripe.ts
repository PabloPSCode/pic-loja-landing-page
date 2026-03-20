"use client";

import { auth } from "@/lib/firebase/auth";
import type { PaidUserPlan } from "@/lib/firebase/user-credits";
import type { AuthUser } from "@/stores/auth-store";
import { useCallback, useState } from "react";

interface StartPlanCheckoutOptions {
  cancelPath?: string;
  successPath?: string;
  user: AuthUser;
}

interface CreateCheckoutResponsePayload {
  checkoutUrl?: string;
  error?: string;
}

export const useStripe = () => {
  const [checkoutPlan, setCheckoutPlan] = useState<PaidUserPlan | null>(null);

  const startPlanCheckout = useCallback(
    async (plan: PaidUserPlan, options: StartPlanCheckoutOptions) => {
      setCheckoutPlan(plan);

      try {
        const idToken = await auth.currentUser?.getIdToken();
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (idToken) {
          headers.Authorization = `Bearer ${idToken}`;
        }

        const response = await fetch("/api/stripe/create-checkout", {
          method: "POST",
          headers,
          body: JSON.stringify({
            plan,
            userId: options.user.id,
            email: options.user.email,
            successPath: options.successPath,
            cancelPath: options.cancelPath,
          }),
        });

        const payload = (await response
          .json()
          .catch(() => null)) as CreateCheckoutResponsePayload | null;

        if (!response.ok || !payload?.checkoutUrl) {
          throw new Error(
            payload?.error ??
              "Nao foi possivel iniciar o checkout do Stripe.",
          );
        }

        window.location.assign(payload.checkoutUrl);
      } finally {
        setCheckoutPlan(null);
      }
    },
    [],
  );

  return {
    checkoutPlan,
    isCheckoutPending: checkoutPlan !== null,
    startPlanCheckout,
  };
};
