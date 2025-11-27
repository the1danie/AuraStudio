"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ParticlesBackground } from "./ParticlesBackground";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Hero() {
  const { t } = useTranslation();

  const handlePortfolioClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticlesBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D]/50 to-[#0D0D0D] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-sm text-[#00E5FF]">{t("hero.badge")}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-[#00E5FF] to-[#8A2BE2] bg-clip-text text-transparent leading-tight"
        >
          {t("hero.titleLine1")}
          <br />
          {t("hero.titleLine2")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/contacts">
            <Button
              size="lg"
              className="bg-[#00E5FF] text-[#0D0D0D] hover:bg-[#00E5FF]/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 px-8 py-6 group"
            >
              {t("hero.primaryCta")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={handlePortfolioClick}
            className="border-[#8A2BE2] text-white hover:text-white hover:bg-[#8A2BE2]/10 hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] transition-all duration-300 px-8 py-6"
          >
            {t("hero.secondaryCta")}
          </Button>
        </motion.div>

        {/* Abstract 3D shape illustration */}
        <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 1, delay: 0.5}}
            className="mb-20 relative"
        >
          <div className="relative w-full max-w-4xl mx-auto h-[400px]">
            {/* Glowing orbs */}
            <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] rounded-full blur-3xl opacity-20"
            />
            <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00E5FF] rounded-full blur-3xl opacity-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
