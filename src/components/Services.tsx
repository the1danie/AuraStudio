"use client";

import { motion } from "motion/react";
import { Brain, Globe, Smartphone, Workflow } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import React from "react";

const SERVICES = [
  {
    icon: Brain,
    titleKey: "services.items.ai.title",
    descriptionKey: "services.items.ai.description",
  },
  {
    icon: Globe,
    titleKey: "services.items.web.title",
    descriptionKey: "services.items.web.description",
  },
  {
    icon: Smartphone,
    titleKey: "services.items.mobile.title",
    descriptionKey: "services.items.mobile.description",
  },
  {
    icon: Workflow,
    titleKey: "services.items.nocode.title",
    descriptionKey: "services.items.nocode.description",
  },
] as const;

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation();

  return (
    <section id="services" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-[#00E5FF] bg-clip-text text-transparent">
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-[#00E5FF]/50">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 to-[#8A2BE2]/0 group-hover:from-[#00E5FF]/5 group-hover:to-[#8A2BE2]/5 transition-all duration-300" />

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] blur-xl opacity-50" />
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-[#00E5FF]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}