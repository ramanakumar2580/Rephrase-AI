import { isDev } from "./helpers";

export const Pricingplans = [
  {
    name: "Basic",
    price: 5,
    description: "Perfect for occasional use",
    items: [
      "Access to essential features",
      "Limited AI processing",
      "5 PDF summaries per month",
      "Basic customer support",
    ],
    id: "Basic",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_aFabIUg2Yf7D1qS89qcfK00"
      : "",
    priceId: isDev ? "price_1RdvaS2ci6xwCVDO7ILAXil5" : "",
  },
  {
    name: "Pro",
    price: 10,
    description: "For professional and team use",
    items: [
      "Unlimited PDF summaries",
      "All features from Basic",
      "Unlimited AI processing",
      "Markdown Export",
      "24/7 Priority customer support",
    ],
    id: "pro",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_00waEQdUQbVr3z0ahycfK01"
      : "",
    priceId: isDev ? "price_1Rdvcg2ci6xwCVDOGBCNMQtN" : "",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};
export const hoverVariants = {
  hover: {
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};
