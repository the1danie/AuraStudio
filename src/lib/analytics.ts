const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const GTAG_SCRIPT_ID = "aurastudio-gtag";

export function initAnalytics() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.info(
        "[analytics] Skipping Google Analytics init — VITE_GA_MEASUREMENT_ID is missing.",
      );
    }
    return;
  }

  if (window.gtag || document.getElementById(GTAG_SCRIPT_ID)) {
    return;
  }

  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  gtagScript.id = GTAG_SCRIPT_ID;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
}