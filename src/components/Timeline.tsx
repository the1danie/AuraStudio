"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Search, Palette, Code, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import React from "react";
const STEPS = [
  {
    number: "01",
    titleKey: "timeline.steps.research.title",
    descriptionKey: "timeline.steps.research.description",
    icon: Search,
  },
  {
    number: "02",
    titleKey: "timeline.steps.prototype.title",
    descriptionKey: "timeline.steps.prototype.description",
    icon: Palette,
  },
  {
    number: "03",
    titleKey: "timeline.steps.build.title",
    descriptionKey: "timeline.steps.build.description",
    icon: Code,
  },
  {
    number: "04",
    titleKey: "timeline.steps.launch.title",
    descriptionKey: "timeline.steps.launch.description",
    icon: Rocket,
  },
] as const;

export function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useTranslation();

  return (
    <section id="process" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-[#8A2BE2] bg-clip-text text-transparent">
            {t("timeline.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("timeline.subtitle")}
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00E5FF] via-[#8A2BE2] to-[#00E5FF] origin-left"
            />

            <div className="grid grid-cols-4 gap-8">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.titleKey}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="relative"
                >
                  {/* Icon circle */}
                  <div className="relative z-10 w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 border-2 border-[#00E5FF] flex items-center justify-center backdrop-blur-sm">
                    <step.icon className="w-12 h-12 text-[#00E5FF]" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] bg-clip-text mb-3">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-gray-400">
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-12">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="flex gap-6"
            >
              <div className="relative flex flex-col items-center">
                {/* Icon circle */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 border-2 border-[#00E5FF] flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                  <step.icon className="w-8 h-8 text-[#00E5FF]" />
                </div>
                
                {/* Connecting line */}
                {index < STEPS.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    className="w-0.5 flex-1 mt-4 bg-gradient-to-b from-[#00E5FF] to-[#8A2BE2] origin-top min-h-[80px]"
                  />
                )}
              </div>

              <div className="flex-1 pb-8">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] bg-clip-text mb-2">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {t(step.titleKey)}
                </h3>
                <p className="text-gray-400">
                  {t(step.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}