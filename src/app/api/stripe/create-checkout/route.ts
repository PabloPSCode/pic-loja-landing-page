import { adminAuth } from "@/lib/firebase/admin";
import type { PaidUserPlan } from "@/lib/firebase/user-credits";
import { isPaidUserPlan } from "@/lib/firebase/user-credits";
import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

interface CreateCheckoutPayload {
  cancelPath?: string;
  email?: string;
  plan?: string;
  successPath?: string;
  userId?: string;
}

function getBearerToken(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice("Bearer ".length).trim();
}

function getPlanPriceId(plan: PaidUserPlan) {
  switch (plan) {
    case "essential":
      return process.env.NEXT_PUBLIC_ESSENTIAL_PLAN_PRICE_ID;
    case "advanced":
      return process.env.NEXT_PUBLIC_ADVANCED_PLAN_PRICE_ID;
    case "professional":
      return process.env.NEXT_PUBLIC_PROFESSIONAL_PLAN_PRICE_ID;
    default:
      return null;
  }
}

function resolveCheckoutUrl(
  request: NextRequest,
  path: string | undefined,
  fallbackPath: string,
) {
  const origin = new URL(request.url).origin;
  const resolvedPath =
    typeof path === "string" && path.startsWith("/") ? path : fallbackPath;

  return new URL(resolvedPath, origin).toString();
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request
      .json()
      .catch(() => null)) as CreateCheckoutPayload | null;

    if (!isPaidUserPlan(payload?.plan)) {
      return NextResponse.json(
        { error: "O plano informado e invalido." },
        { status: 400 },
      );
    }

    const bearerToken = getBearerToken(request);
    let authenticatedUserId = payload.userId?.trim() ?? "";
    let authenticatedEmail = payload.email?.trim() ?? "";

    if (bearerToken) {
      const decodedToken = await adminAuth.verifyIdToken(bearerToken);
      authenticatedUserId = decodedToken.uid;
      authenticatedEmail = decodedToken.email?.trim() ?? authenticatedEmail;
    }

    if (!authenticatedUserId) {
      return NextResponse.json(
        { error: "Faça login antes de contratar um plano." },
        { status: 401 },
      );
    }

    const selectedPriceId = getPlanPriceId(payload.plan);

    if (!selectedPriceId) {
      return NextResponse.json(
        { error: "Os price IDs do Stripe nao foram configurados." },
        { status: 500 },
      );
    }

    const successUrl = resolveCheckoutUrl(
      request,
      payload.successPath,
      `/start?checkout=success&plan=${payload.plan}`,
    );
    const cancelUrl = resolveCheckoutUrl(
      request,
      payload.cancelPath,
      "/#planos",
    );

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: authenticatedUserId,
      ...(authenticatedEmail ? { customer_email: authenticatedEmail } : {}),
      metadata: {
        plan: payload.plan,
        userId: authenticatedUserId,
      },
      subscription_data: {
        metadata: {
          plan: payload.plan,
          userId: authenticatedUserId,
        },
      },
    });

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: "Nao foi possivel obter a URL do checkout do Stripe." },
        { status: 500 },
      );
    }

    return NextResponse.json({ checkoutUrl: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);

    return NextResponse.json(
      { error: "Nao foi possivel iniciar o checkout do Stripe." },
      { status: 500 },
    );
  }
}
