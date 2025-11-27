"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Target, Rocket, Shield, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { getRouteSeo, normalizeLocale } from "../seo.config";

const FEATURES = [
  { icon: Target, key: "research" },
  { icon: Rocket, key: "solutions" },
  { icon: Shield, key: "security" },
  { icon: Sparkles, key: "fullCycle" },
] as const;

export function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, i18n } = useTranslation();
  const lang = normalizeLocale(i18n.language);
  const seo = getRouteSeo("about", lang);
  const statKeys: Array<"projects" | "clients" | "support" | "experience"> = [
    "projects",
    "clients",
    "support",
    "experience",
  ];

  return (
    <>
      <Seo {...seo} lang={lang} pathname="/about" />
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-6"
        >
          <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00E5FF]/10 to-[#8A2BE2]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
            {t("about.badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 bg-gradient-to-r from-[#00E5FF] via-white to-[#8A2BE2] bg-clip-text text-transparent"
        >
          {t("about.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
        >
          {t("about.intro")}
        </motion.p>
      </motion.div>

      {/* Feature Cards */}
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-[#1A1A1A]/50 backdrop-blur-xl border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 via-[#8A2BE2]/0 to-[#00E5FF]/0 group-hover:from-[#00E5FF]/5 group-hover:via-[#8A2BE2]/5 group-hover:to-[#00E5FF]/5 transition-all duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-500">
                    <feature.icon className="w-8 h-8 text-[#00E5FF]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-white group-hover:text-[#00E5FF] transition-colors duration-300">
                  {t(`about.features.${feature.key}.title`)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t(`about.features.${feature.key}.description`)}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-5xl mx-auto mt-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statKeys.map((statKey, index) => {
            const statData = t(`about.stats.${statKey}`, { returnObjects: true }) as {
              number: string;
              label: string;
            };
            return (
            <motion.div
              key={statKey}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-[#00E5FF]/5 to-[#8A2BE2]/5 border border-white/5"
            >
              <div className="bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] bg-clip-text text-transparent mb-2">
                {statData.number}
              </div>
              <p className="text-sm text-gray-400">{statData.label}</p>
            </motion.div>
            );
          })}
        </div>
      </motion.div>
      </div>
    </>
  );
}
