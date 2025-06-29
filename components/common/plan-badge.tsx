import { getPriceIdForActiveUser } from "@/lib/user";
import { Pricingplans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const user = await currentUser();
  if (!user?.id) return null;
  const email = user?.emailAddresses?.[0]?.emailAddress;
  let priceId: string | null = null;
  if (email) {
    priceId = await getPriceIdForActiveUser(email);
  }

  let planName = "Buy a Plan";

  const plan = Pricingplans.find((plan) => plan.priceId === priceId);
  if (plan) {
    planName = plan.name;
  }
  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
        !priceId && "from-violet-100 to-violet-200 border-violet-300"
      )}
    >
      <Crown
        className={cn("w-3 h-3 text-amber-600", priceId && "text-violet-600")}
      />
      {planName}
    </Badge>
  );
}
