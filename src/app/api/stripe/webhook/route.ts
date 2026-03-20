import { upgradeUserPlanById } from "@/lib/firebase/admin-users";
import { isPaidUserPlan } from "@/lib/firebase/user-credits";
import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret || !signature) {
      return new NextResponse("Stripe webhook secret or signature not found", {
        status: 400,
      });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const plan = session.metadata?.plan;
        const userId =
          session.metadata?.userId ?? session.client_reference_id ?? null;

        if (session.payment_status !== "paid") {
          break;
        }

        if (!userId || !isPaidUserPlan(plan)) {
          console.error(
            "Stripe checkout completed without a valid plan or userId.",
            {
              plan,
              sessionId: session.id,
              userId,
            },
          );
          break;
        }

        await upgradeUserPlanById(userId, plan);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error at trying to listen to Stripe webhook:", error);
    return new NextResponse(null, { status: 500 });
  }
}
