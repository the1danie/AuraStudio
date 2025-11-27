"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Bot, Check, Crown, Globe, Rocket, Sparkles, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Seo } from "../components/Seo";
import { getRouteSeo, normalizeLocale } from "../seo.config";

type SectionKey = "websites" | "mobileApps" | "ai";
type TierKey = "landing" | "corporate" | "saas" | "mvp" | "business" | "enterpriseApp" | "assistant" | "automation" | "enterprise";

interface TranslatedTier {
  key: TierKey;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface TranslatedSection {
  badge: string;
  title: string;
  subtitle: string;
  tiers: TranslatedTier[];
  recommended?: string;
}

const ICON_MAP: Record<TierKey, React.ComponentType<{ className?: string }>> = {
  landing: Zap,
  corporate: Globe,
  saas: Crown,
  mvp: Zap,
  business: Globe,
  enterpriseApp: Rocket,
  assistant: Bot,
  automation: Sparkles,
  enterprise: Rocket,
};

const TIER_STYLE_MAP: Record<
  TierKey,
  {
    gradient: string;
    borderColor: string;
    iconBg: string;
    iconColor: string;
    hoverBorder: string;
    popularButton: string;
    defaultButton: string;
  }
> = {
  landing: {
    gradient: "from-[#00E5FF]/20 to-[#00E5FF]/5",
    borderColor: "border-[#00E5FF]/30",
    iconBg: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    iconColor: "text-[#00E5FF]",
    hoverBorder: "hover:border-[#00E5FF]",
    popularButton: "bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#00E5FF]/50 hover:bg-[#1A1A1A]/80",
  },
  corporate: {
    gradient: "from-[#8A2BE2]/20 to-[#00E5FF]/20",
    borderColor: "border-[#8A2BE2]/50",
    iconBg: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    iconColor: "text-[#00E5FF]",
    hoverBorder: "hover:border-[#00E5FF]",
    popularButton: "bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#00E5FF]/50 hover:bg-[#1A1A1A]/80",
  },
  saas: {
    gradient: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    borderColor: "border-[#00E5FF]/30",
    iconBg: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    iconColor: "text-[#00E5FF]",
    hoverBorder: "hover:border-[#00E5FF]",
    popularButton: "bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#00E5FF]/50 hover:bg-[#1A1A1A]/80",
  },
  assistant: {
    gradient: "from-[#8A2BE2]/20 to-[#00E5FF]/20",
    borderColor: "border-[#8A2BE2]/50",
    iconBg: "from-[#8A2BE2]/20 to-[#00E5FF]/20",
    iconColor: "text-[#8A2BE2]",
    hoverBorder: "hover:border-[#8A2BE2]",
    popularButton: "bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] text-white hover:shadow-[0_0_30px_rgba(138,43,226,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#8A2BE2]/50 hover:bg-[#1A1A1A]/80",
  },
  automation: {
    gradient: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    borderColor: "border-[#00E5FF]/30",
    iconBg: "from-[#8A2BE2]/20 to-[#00E5FF]/20",
    iconColor: "text-[#8A2BE2]",
    hoverBorder: "hover:border-[#8A2BE2]",
    popularButton: "bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] text-white hover:shadow-[0_0_30px_rgba(138,43,226,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#8A2BE2]/50 hover:bg-[#1A1A1A]/80",
  },
  enterprise: {
    gradient: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    borderColor: "border-[#00E5FF]/30",
    iconBg: "from-[#8A2BE2]/20 to-[#00E5FF]/20",
    iconColor: "text-[#8A2BE2]",
    hoverBorder: "hover:border-[#8A2BE2]",
    popularButton: "bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] text-white hover:shadow-[0_0_30px_rgba(138,43,226,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#8A2BE2]/50 hover:bg-[#1A1A1A]/80",
  },
  mvp: {
    gradient: "from-[#00E5FF]/20 to-[#00E5FF]/5",
    borderColor: "border-[#00E5FF]/30",
    iconBg: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    iconColor: "text-[#00E5FF]",
    hoverBorder: "hover:border-[#00E5FF]",
    popularButton: "bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#00E5FF]/50 hover:bg-[#1A1A1A]/80",
  },
  business: {
    gradient: "from-[#8A2BE2]/20 to-[#00E5FF]/20",
    borderColor: "border-[#8A2BE2]/50",
    iconBg: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    iconColor: "text-[#00E5FF]",
    hoverBorder: "hover:border-[#00E5FF]",
    popularButton: "bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#00E5FF]/50 hover:bg-[#1A1A1A]/80",
  },
  enterpriseApp: {
    gradient: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    borderColor: "border-[#00E5FF]/30",
    iconBg: "from-[#00E5FF]/20 to-[#8A2BE2]/20",
    iconColor: "text-[#00E5FF]",
    hoverBorder: "hover:border-[#00E5FF]",
    popularButton: "bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]",
    defaultButton: "bg-[#1A1A1A] border border-white/10 text-white hover:border-[#00E5FF]/50 hover:bg-[#1A1A1A]/80",
  },
};

const SECTION_SPACING: Record<SectionKey, string> = {
  websites: "mb-12",
  mobileApps: "mb-12",
  ai: "mb-16",
};

export function PricingPage() {
  const [activeTab, setActiveTab] = useState<"websites" | "mobileApps">("websites");
  const websitesRef = useRef<HTMLDivElement | null>(null);
  const mobileAppsRef = useRef<HTMLDivElement | null>(null);
  const aiRef = useRef<HTMLDivElement | null>(null);
  const websitesInView = useInView(websitesRef, { once: true, amount: 0.1 });
  const mobileAppsInView = useInView(mobileAppsRef, { once: true, amount: 0.1 });
  const aiInView = useInView(aiRef, { once: true, amount: 0.1 });
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = normalizeLocale(i18n.language);
  const seo = getRouteSeo("pricing", lang);

  const handlePlanSelect = (tierName: string, sectionKey: SectionKey) => {
    const planLabel = `${sectionKey === "ai" ? "AI: " : ""}${tierName}`;
    toast.success(t("toast.planSelected", { plan: tierName }), {
      description: t("toast.planSelectedDescription"),
    });
    navigate(`/contacts?plan=${encodeURIComponent(planLabel)}`);
  };

  const sections = useMemo(() => {
    const sectionsData = t("pricingPage.sections", {
      returnObjects: true,
    }) as Record<SectionKey, TranslatedSection>;
    return sectionsData;
  }, [t]);

  const sectionOrder: SectionKey[] = ["ai"];

  return (
    <>
      <Seo {...seo} lang={lang} pathname="/pricing" />
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00E5FF]/10 to-[#8A2BE2]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
              {t("pricingPage.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 bg-gradient-to-r from-[#00E5FF] via-white to-[#8A2BE2] bg-clip-text text-transparent"
          >
            {t("pricingPage.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t("pricingPage.subtitle")}
          </motion.p>
        </motion.div>

        {/* AI Section */}
        {sectionOrder.map((sectionKey) => {
          if (sectionKey === "websites" || sectionKey === "mobileApps") {
            return null;
          }

          const section = sections[sectionKey];
          if (!section) {
            return null;
          }

          const sectionRef = sectionKey === "ai" ? aiRef : null;
          const sectionInView = sectionKey === "ai" ? aiInView : false;

          return (
            <div key={sectionKey} ref={sectionRef} className={SECTION_SPACING[sectionKey]}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full text-sm font-semibold text-white/90 bg-white/5 border border-white/10">
                  {section.badge}
                </span>
                <h2 className="mb-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#8A2BE2] to-white bg-clip-text text-transparent">
                  {section.title}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">{section.subtitle}</p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {section.tiers.map((tier, index) => {
                  const style = TIER_STYLE_MAP[tier.key];
                  if (!style) {
                    return null;
                  }
                  const Icon = ICON_MAP[tier.key];

                  return (
                    <motion.div
                      key={`${sectionKey}-${tier.key}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`relative group ${tier.popular ? "lg:scale-105 z-10" : ""}`}
                    >
                      {tier.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white text-sm">
                            {section.recommended ?? t("pricing.popularLabel")}
                          </span>
                        </div>
                      )}

                      <div
                        className={`relative h-full p-8 rounded-2xl bg-[#1A1A1A]/50 backdrop-blur-xl border ${style.borderColor} ${style.hoverBorder} transition-all duration-500 overflow-hidden group-hover:scale-[1.02]`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                        />

                        <div className="relative z-10">
                          <div className="mb-6">
                            <div
                              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${style.iconBg} flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-500`}
                            >
                              <Icon className={`w-8 h-8 ${style.iconColor}`} />
                            </div>
                          </div>

                          <h3 className="mb-2 text-white">{tier.name}</h3>
                          <p className="text-sm text-gray-400 mb-6">{tier.description}</p>

                          <div className="mb-8">
                            <div className="flex flex-col gap-1">
                              <span className="text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] bg-clip-text text-transparent">
                                {tier.price}
                              </span>
                              <span className="text-sm text-gray-400">{tier.period}</span>
                            </div>
                          </div>

                          <ul className="space-y-4 mb-8">
                            {tier.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-[#00E5FF]" />
                                </div>
                                <span className="text-sm text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button 
                            onClick={() => handlePlanSelect(tier.name, sectionKey)}
                            className={`w-full ${tier.popular ? style.popularButton : style.defaultButton} transition-all duration-300`}
                          >
                            {t("pricing.selectPlan")}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Web Development Tabs */}
        <div className="mb-12">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("websites")}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                activeTab === "websites"
                  ? "bg-[#00E5FF] text-[#0D0D0D] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                  : "bg-transparent text-gray-400 border-white/20 hover:border-[#00E5FF]/50 hover:text-white"
              }`}
            >
              {t("pricingPage.sections.websites.badge")}
            </button>
            <button
              onClick={() => setActiveTab("mobileApps")}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                activeTab === "mobileApps"
                  ? "bg-[#00E5FF] text-[#0D0D0D] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                  : "bg-transparent text-gray-400 border-white/20 hover:border-[#00E5FF]/50 hover:text-white"
              }`}
            >
              {t("pricingPage.sections.mobileApps.badge")}
            </button>
          </div>

          {/* Websites Section */}
          {activeTab === "websites" && sections.websites && (
            <div ref={websitesRef}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="mb-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00E5FF] to-white bg-clip-text text-transparent">
                  {sections.websites.title}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">{sections.websites.subtitle}</p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {sections.websites.tiers.map((tier, index) => {
                  const style = TIER_STYLE_MAP[tier.key];
                  if (!style) return null;
                  const Icon = ICON_MAP[tier.key];

                  return (
                    <motion.div
                      key={`websites-${tier.key}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`relative group ${tier.popular ? "lg:scale-105 z-10" : ""}`}
                    >
                            {tier.popular && (
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white text-sm">
                                  {t("pricing.popularLabel")}
                                </span>
                              </div>
                            )}

                            <div
                              className={`relative h-full p-8 rounded-2xl bg-[#1A1A1A]/50 backdrop-blur-xl border ${style.borderColor} ${style.hoverBorder} transition-all duration-500 overflow-hidden group-hover:scale-[1.02]`}
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                              />

                              <div className="relative z-10">
                                <div className="mb-6">
                                  <div
                                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${style.iconBg} flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-500`}
                                  >
                                    <Icon className={`w-8 h-8 ${style.iconColor}`} />
                                  </div>
                                </div>

                                <h3 className="mb-2 text-white">{tier.name}</h3>
                                <p className="text-sm text-gray-400 mb-6">{tier.description}</p>

                                <div className="mb-8">
                                  <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] bg-clip-text text-transparent">
                                      {tier.price}
                                    </span>
                                    <span className="text-sm text-gray-400">{tier.period}</span>
                                  </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                  {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                      <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-[#00E5FF]" />
                                      </div>
                                      <span className="text-sm text-gray-300">{feature}</span>
                                    </li>
                                  ))}
                                </ul>

                                <Button 
                                  onClick={() => handlePlanSelect(tier.name, "websites")}
                                  className={`w-full ${tier.popular ? style.popularButton : style.defaultButton}`}
                                >
                                  {t("pricing.selectPlan")}
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
            </div>
          )}

          {/* Mobile Apps Section */}
          {activeTab === "mobileApps" && sections.mobileApps && (
            <div ref={mobileAppsRef}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="mb-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00E5FF] to-white bg-clip-text text-transparent">
                  {sections.mobileApps.title}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">{sections.mobileApps.subtitle}</p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {sections.mobileApps.tiers.map((tier, index) => {
                  const style = TIER_STYLE_MAP[tier.key];
                  if (!style) return null;
                  const Icon = ICON_MAP[tier.key];

                  return (
                    <motion.div
                      key={`mobileApps-${tier.key}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`relative group ${tier.popular ? "lg:scale-105 z-10" : ""}`}
                    >
                            {tier.popular && (
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white text-sm">
                                  {t("pricing.popularLabel")}
                                </span>
                              </div>
                            )}

                            <div
                              className={`relative h-full p-8 rounded-2xl bg-[#1A1A1A]/50 backdrop-blur-xl border ${style.borderColor} ${style.hoverBorder} transition-all duration-500 overflow-hidden group-hover:scale-[1.02]`}
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                              />

                              <div className="relative z-10">
                                <div className="mb-6">
                                  <div
                                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${style.iconBg} flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-500`}
                                  >
                                    <Icon className={`w-8 h-8 ${style.iconColor}`} />
                                  </div>
                                </div>

                                <h3 className="mb-2 text-white">{tier.name}</h3>
                                <p className="text-sm text-gray-400 mb-6">{tier.description}</p>

                                <div className="mb-8">
                                  <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] bg-clip-text text-transparent">
                                      {tier.price}
                                    </span>
                                    <span className="text-sm text-gray-400">{tier.period}</span>
                                  </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                  {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                      <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-[#00E5FF]" />
                                      </div>
                                      <span className="text-sm text-gray-300">{feature}</span>
                                    </li>
                                  ))}
                                </ul>

                                <Button 
                                  onClick={() => handlePlanSelect(tier.name, "mobileApps")}
                                  className={`w-full ${tier.popular ? style.popularButton : style.defaultButton}`}
                                >
                                  {t("pricing.selectPlan")}
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={aiInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#00E5FF]/10 to-[#8A2BE2]/10 border border-white/10">
            <h3 className="mb-4 text-white">{t("pricingPage.customCtaTitle")}</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{t("pricingPage.customCtaDescription")}</p>
            <Button className="bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300">
              {t("pricingPage.customCtaButton")}
            </Button>
          </div>
        </motion.div>
      </div>
      </div>
    </>
  );
}
