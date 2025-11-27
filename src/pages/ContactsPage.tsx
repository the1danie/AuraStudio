"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { MessageCircle, Send, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import React from "react";
import { Seo } from "../components/Seo";
import { getRouteSeo, normalizeLocale } from "../seo.config";
import emailjs from '@emailjs/browser';
type ContactItem = {
  icon: LucideIcon;
  labelKey: string;
  value?: string;
  valueKey?: string;
  link: string;
  external: boolean;
};

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: MessageCircle,
    labelKey: "contacts.contactMethods.whatsapp",
    value: "+7 (771) 380-89-08",
    link: "https://wa.me/77713808908",
    external: true,
  },
] ;

export function ContactsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      setSelectedPlan(decodeURIComponent(plan));
    }
  }, [searchParams]);

  const handleRemovePlan = () => {
    setSelectedPlan(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("plan");
    setSearchParams(newSearchParams, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Замените эти значения на ваши из EmailJS
      const serviceID = 'service_pckyc08';
      const templateID = 'template_5ef6moo';
      const publicKey = 'AGH94PHRReYkH8n-T';
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email || t("forms.emailNotProvided"),
        phone: formData.phone || t("forms.phoneNotProvided"),
        plan: selectedPlan || t("forms.planNotSelected"),
        message: formData.message,
        to_email: 'daniyalabuov@gmail.com',
      };
      
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      toast.success(t("toast.formSubmitted"), {
        description: t("toast.formSubmittedDescription"),
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSelectedPlan(null);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("plan");
      setSearchParams(newSearchParams, { replace: true });
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error(t("toast.formError"), {
        description: t("toast.formErrorDescription"),
      });
    }
  };

  const lang = normalizeLocale(i18n.language);
  const seo = getRouteSeo("contacts", lang);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Seo {...seo} lang={lang} pathname="/contacts" />
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00E5FF]/10 to-[#8A2BE2]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
              {t("contacts.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 bg-gradient-to-r from-[#00E5FF] via-white to-[#8A2BE2] bg-clip-text text-transparent"
          >
            {t("contacts.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t("contacts.subtitle")}
          </motion.p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 text-white">{t("contacts.contactSectionTitle")}</h2>

            <div className="space-y-6 mb-10">
              {CONTACT_ITEMS.map((item, index) => (
                <motion.a
                  key={item.labelKey}
                  href={item.link}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 rounded-xl bg-[#1A1A1A]/50 backdrop-blur-xl border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300">
                    <item.icon className="w-6 h-6 text-[#00E5FF]" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">{t(item.labelKey)}</h3>
                    <p className="text-white group-hover:text-[#00E5FF] transition-colors duration-300">
                      {item.valueKey ? t(item.valueKey) : item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-xl bg-gradient-to-br from-[#00E5FF]/10 to-[#8A2BE2]/10 border border-white/10"
            >
              <h3 className="mb-4 text-white">{t("contacts.workingHoursTitle")}</h3>
              <div className="space-y-2 text-gray-300">
                <p>{t("contacts.workingHours.weekdays")}</p>
                <p>{t("contacts.workingHours.saturday")}</p>
                <p className="text-[#00E5FF]">{t("contacts.workingHours.support")}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h2 className="mb-8 text-white">{t("contacts.formTitle")}</h2>
            <div className="p-8 rounded-2xl bg-[#1A1A1A]/50 backdrop-blur-xl border border-white/10">
              {selectedPlan && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-6 rounded-xl bg-gradient-to-r from-[#00E5FF]/10 to-[#8A2BE2]/10 border border-[#00E5FF]/30 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{t("contacts.selectedPlan")}</p>
                    <p className="text-white font-semibold">{selectedPlan}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePlan}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Remove plan"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    {t("forms.nameLabel")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0D0D0D]/50 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00E5FF]/50"
                    placeholder={t("forms.namePlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    {t("forms.emailLabel")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0D0D0D]/50 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00E5FF]/50"
                    placeholder={t("forms.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">
                    {t("forms.phoneLabel")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0D0D0D]/50 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00E5FF]/50"
                    placeholder={t("forms.phonePlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                    {t("forms.messageLabel")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-[#0D0D0D]/50 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00E5FF]/50 resize-none"
                    placeholder={t("forms.messagePlaceholder")}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 group"
                >
                  <span>{t("forms.submit")}</span>
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  {t("forms.privacyNote")}
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </>
  );
}
