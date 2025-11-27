"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Zap, TrendingUp, Users, Shield, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";
import React from "react";
const BENEFITS = [
  {
    icon: Zap,
    titleKey: "whyChooseUs.items.speed.title",
    descriptionKey: "whyChooseUs.items.speed.description",
  },
  {
    icon: TrendingUp,
    titleKey: "whyChooseUs.items.scalability.title",
    descriptionKey: "whyChooseUs.items.scalability.description",
  },
  {
    icon: Users,
    titleKey: "whyChooseUs.items.communication.title",
    descriptionKey: "whyChooseUs.items.communication.description",
  },
  {
    icon: Shield,
    titleKey: "whyChooseUs.items.results.title",
    descriptionKey: "whyChooseUs.items.results.description",
  },
  {
    icon: Cpu,
    titleKey: "whyChooseUs.items.futureProof.title",
    descriptionKey: "whyChooseUs.items.futureProof.description",
  },
] as const;

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation();

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] bg-clip-text text-transparent">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("whyChooseUs.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.titleKey}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-[#1A1A1A]/50 backdrop-blur-sm border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-300">
                {/* Animated checkmark that appears on hover */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#8A2BE2] flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeWidth="3"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                {/* Icon with glow effect */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300"
                >
                  <benefit.icon className="w-8 h-8 text-[#00E5FF]" />
                </motion.div>

                <h3 className="text-xl font-bold mb-3 text-white">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t(benefit.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
