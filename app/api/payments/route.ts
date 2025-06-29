import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endPointSecret);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout session is completed ");
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutSessionCompleted({ session, stripe });

        break;
      case "customer.subscription.deleted":
        console.log("Customer subscription is deleted ");
        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted({ subscriptionId, stripe });
        console.log(subscription);
        break;
      default:
        console.log(`unhandled event type ${event.type}`);
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to trigger webhook", err },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "success",
  });
};
