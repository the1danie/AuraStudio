"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Bot, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "pricing", href: "/pricing" },
  { key: "contacts", href: "/contacts" },
];
const SUPPORTED_LANGUAGES = [
  { code: "ru", flag: "🇷🇺" },
  { code: "kk", flag: "🇰🇿" },
  { code: "en", flag: "🇬🇧" },
] as const;
type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const languageSwitcherRef = useRef<HTMLDivElement>(null);
  const rawLanguage = (i18n.language || "ru").split("-")[0];
  const currentLanguage = (SUPPORTED_LANGUAGES.find((lang) => lang.code === rawLanguage)?.code ??
    "ru") as LanguageCode;

  const navLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => ({
        ...link,
        name: t(`navbar.links.${link.key}`),
      })),
    [t]
  );

  const languageOptions = useMemo(
    () =>
      SUPPORTED_LANGUAGES.map((lang) => ({
        ...lang,
        label: t(`navbar.language.${lang.code}`),
      })),
    [t]
  );

  const currentLanguageData = languageOptions.find((lang) => lang.code === currentLanguage);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLanguageMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLanguageMenuOpen &&
        languageSwitcherRef.current &&
        !languageSwitcherRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLanguageMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,229,255,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#8A2BE2] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] bg-clip-text text-transparent">
                  {t("navbar.brand")}
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={`relative transition-colors duration-300 group ${
                      location.pathname === link.href
                        ? "text-[#00E5FF]"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] transition-all duration-300 ${
                        location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:flex items-center gap-4"
            >
              <div className="relative flex" ref={languageSwitcherRef}>
                <motion.button
                  type="button"
                  onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-[#111111]/70 px-4 py-2 text-sm font-semibold uppercase text-gray-300 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <motion.span
                    key={currentLanguageData?.code}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-base"
                  >
                    {currentLanguageData?.flag}
                  </motion.span>
                  <span>{currentLanguageData?.label}</span>
                  <motion.span
                    animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-500"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 40, x: -10, scale: 1 }} // немного ниже и левее
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-6 w-48 translate-y-[calc(100%+2rem)] origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D]/95 backdrop-blur-lg shadow-[0_14px_50px_rgba(0,229,255,0.15)]"
                    >
                      <div className="p-2 space-y-1">
                        {languageOptions.map((option, index) => {
                          const isActive = option.code === currentLanguage;
                          return (
                            <motion.button
                              key={option.code}
                              type="button"
                              onClick={() => {
                                if (!isActive) {
                                  void i18n.changeLanguage(option.code);
                                }
                                setIsLanguageMenuOpen(false);
                              }}
                              className="relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-2 text-sm font-medium text-left text-gray-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/60"
                              whileHover={{ x: 4 }}
                              transition={{ delay: index * 0.02 }}
                            >
                              {isActive && (
                                <motion.span
                                  layoutId="languageActiveBg"
                                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00E5FF]/15 to-[#8A2BE2]/20 border border-[#00E5FF]/30"
                                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                />
                              )}
                              <span className="relative z-10 text-lg">{option.flag}</span>
                              <span className="relative z-10 uppercase tracking-wide">
                                {option.label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/contacts">
                <Button
                  className="bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300"
                >
                  {t("navbar.cta")}
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white hover:border-[#00E5FF]/50 transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block text-lg transition-colors duration-300 py-2 ${
                        location.pathname === link.href
                          ? "text-[#00E5FF]"
                          : "text-gray-300 hover:text-[#00E5FF]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                >
                  <Link to="/contacts">
                    <Button
                      className="w-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300"
                    >
                      {t("navbar.cta")}
                    </Button>
                  </Link>
                </motion.div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500 mb-3">{t("navbar.language.label")}</p>
                  <motion.div layout className="flex gap-2">
                    {languageOptions.map((option) => {
                      const isActive = option.code === currentLanguage;
                      return (
                        <motion.button
                          key={option.code}
                          type="button"
                          onClick={() => {
                            if (!isActive) {
                              void i18n.changeLanguage(option.code);
                            }
                          }}
                          className="relative flex-1 rounded-lg border border-white/12 px-3 py-2 text-sm font-semibold uppercase text-gray-300 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/50"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="languageActiveMobile"
                              className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00E5FF]/15 to-[#8A2BE2]/20 border border-[#00E5FF]/40"
                              transition={{ type: "spring", stiffness: 250, damping: 20 }}
                            />
                          )}
                          <span className="relative z-10 flex items-center justify-center gap-1">
                            <span>{option.flag}</span>
                            {option.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-20" />
    </>
  );
}