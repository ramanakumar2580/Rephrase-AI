import { Pricingplans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();
  const query = await sql`
    SELECT price_id FROM users WHERE email = ${email} AND status = 'active'
  `;
  return query?.[0]?.price_id || null;
}

export async function hasActivePlan(email: string) {
  const sql = await getDbConnection();
  const query = await sql`
    SELECT price_id FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL
  `;
  return query && query.length > 0;
}

export async function hasReachedUploadLimit(user: User) {
  const uploadCount = await getUserUploadCount(user.id);
  const email = user.emailAddresses[0].emailAddress;
  const priceId = await getPriceIdForActiveUser(email);
  const isPro =
    Pricingplans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const uploadLimit = isPro ? 1000 : 5;
  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}

export async function getSubscriptionStatus(user: User) {
  const email = user.emailAddresses[0].emailAddress;
  return await hasActivePlan(email);
}
