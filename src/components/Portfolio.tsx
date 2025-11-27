"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import React from "react";
type PortfolioFilter = "all" | "websites" | "mobileApps" | "ai";

const FILTERS: PortfolioFilter[] = ["all", "websites", "mobileApps", "ai"];

const PROJECTS = [
  {
    id: 1,
    key: "incampus",
    filter: "mobileApps" as PortfolioFilter,
    image: new URL("../assets/images/portfolio/inCampus.png", import.meta.url).href,
    url: undefined,
    urlAndroid: "https://play.google.com/store/apps/details?id=com.nkzu&hl=ru",
    urlIos: "https://apps.apple.com/kz/app/mynku/id6739483145",
  },
  {
    id: 2,
    key: "agropulse",
    filter: "ai" as PortfolioFilter,
    image: new URL("../assets/images/portfolio/agropulse.png", import.meta.url).href,
    url: "https://agropulse.fm64.me",
    urlAndroid: undefined,
    urlIos: undefined,
  },
  {
    id: 3,
    key: "kuadmin",
    filter: "websites" as PortfolioFilter,
    image: new URL("../assets/images/portfolio/kuadmin.png", import.meta.url).href,
    url: "https://kuadmin.fm64.me/",
    urlAndroid: undefined,
    urlIos: undefined,
  },
  {
    id: 4,
    key: "skoHubLibrary",
    filter: "websites" as PortfolioFilter,
    image: new URL("../assets/images/portfolio/sko-hub-library.png", import.meta.url).href,
    url: "https://creative-sko-inko.vercel.app",
    urlAndroid: undefined,
    urlIos: undefined,
  },
] as const;

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("all");
  const { t } = useTranslation();

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.filter === activeFilter);

  return (
    <section id="portfolio" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-[#00E5FF] bg-clip-text text-transparent">
            {t("portfolio.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[#00E5FF] text-[#0D0D0D] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                  : "bg-transparent text-gray-400 border-white/20 hover:border-[#00E5FF]/50 hover:text-white"
              }`}
            >
              {t(`portfolio.filters.${filter}`)}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const ProjectWrapper = project.url ? "a" : "div";
            const wrapperProps = project.url
              ? {
                  href: project.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};
            
            // Don't make card clickable if only app store links exist
            const hasAppStoreLinks = project.urlAndroid || project.urlIos;
            const effectiveWrapper = project.url ? ProjectWrapper : (hasAppStoreLinks ? "div" : ProjectWrapper);

            return (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-[#1A1A1A] border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-300"
              >
                {React.createElement(effectiveWrapper, {
                  ...(project.url ? wrapperProps : {}),
                  className: project.url ? "block cursor-pointer" : "block",
                }, (
                  <>
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageWithFallback
                          src={project.image}
                          alt={t(`portfolio.projects.${project.key}.title`)}
                          className={`${
                            project.key === "agropulse" 
                              ? "w-[150px] h-[150px]" 
                              : "w-full h-full"
                          } object-cover transition-transform duration-500`}
                        />
                      </div>
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      
                      {/* Hover overlay */}
                      {(project.url || project.urlAndroid || project.urlIos) && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            className="w-16 h-16 rounded-full bg-[#00E5FF] flex items-center justify-center"
                          >
                            <ExternalLink className="w-8 h-8 text-[#0D0D0D]" />
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-sm mb-3">
                        {t(`portfolio.projects.${project.key}.category`)}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#00E5FF] transition-colors duration-300">
                        {t(`portfolio.projects.${project.key}.title`)}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {t(`portfolio.projects.${project.key}.description`)}
                      </p>
                      {/* App Store Links */}
                      {(project.urlAndroid || project.urlIos) && (
                        <div className="flex gap-2 mt-4">
                          {project.urlAndroid && (
                            <a
                              href={project.urlAndroid}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-colors text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Android
                            </a>
                          )}
                          {project.urlIos && (
                            <a
                              href={project.urlIos}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-colors text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              iOS
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}