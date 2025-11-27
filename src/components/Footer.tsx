"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "pricing", href: "/pricing" },
  { key: "contacts", href: "/contacts" },
] as const;

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    href: "https://wa.me/77713808908",
    labelKey: "contacts.contactMethods.whatsapp",
    value: "+7 (771) 380-89-08",
    external: true,
  },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="relative border-t border-white/10 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] bg-clip-text text-transparent mb-4">
                {t("navbar.brand")}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">{t("footer.tagline")}</p>

              {/* Contact methods */}
              <div className="space-y-3">
                {CONTACT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={method.labelKey}
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 text-gray-400 hover:text-[#00E5FF] transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#00E5FF]/10 transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span>
                        {t(method.labelKey)}: {method.value}
                      </span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-white mb-4">{t("footer.navigationTitle")}</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#00E5FF] transition-colors duration-300 inline-block"
                  >
                    {t(`navbar.links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-white mb-4">{t("footer.socialTitle")}</h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-gray-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div> */}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 text-center text-gray-400"
        >
          <p>{t("footer.copyright", { year: currentYear })}</p>
        </motion.div>
      </div>

      {/* Ambient glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50" />
    </footer>
  );
}
