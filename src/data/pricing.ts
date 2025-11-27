import type { TFunction } from "i18next";
import type { LucideIcon } from "lucide-react";
import { Zap, Crown, Rocket } from "lucide-react";

export type PricingTierKey = "basic" | "professional" | "enterprise";

export interface PricingTierConfig {
  key: PricingTierKey;
  icon: LucideIcon;
  popular: boolean;
  gradient: string;
  borderColor: string;
}

export interface PricingTier extends PricingTierConfig {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export const PRICING_TIER_CONFIG: PricingTierConfig[] = [
  {
    key: "basic",
    icon: Zap,
    popular: false,
    gradient: "from-[#00E5FF]/20 to-[#00E5FF]/5",
    borderColor: "border-[#00E5FF]/30",
  },
  {
    key: "professional",
    icon: Crown,
    popular: true,
    gradient: "from-[#8A2BE2]/20 to-[#00E5FF]/20",
    borderColor: "border-[#8A2BE2]/50",
  },
  {
    key: "enterprise",
    icon: Rocket,
    popular: false,
    gradient: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    borderColor: "border-[#00E5FF]/30",
  },
] as const;

export const buildPricingTiers = (t: TFunction<"translation">): PricingTier[] =>
  PRICING_TIER_CONFIG.map((config) => ({
    ...config,
    name: t(`pricing.tiers.${config.key}.name`),
    price: t(`pricing.tiers.${config.key}.price`),
    period: t(`pricing.tiers.${config.key}.period`),
    description: t(`pricing.tiers.${config.key}.description`),
    features: t(`pricing.tiers.${config.key}.features`, {
      returnObjects: true,
    }) as string[],
  }));

