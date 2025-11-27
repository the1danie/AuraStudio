export type AppLocale = "ru" | "en" | "kk";
export type SeoRoute = "home" | "about" | "pricing" | "contacts";

type RouteMeta = {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
};

export const BRAND_NAME = "Aura Studio";
export const DEFAULT_SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://aurastudio-3cee7.web.app";
export const DEFAULT_OG_IMAGE = `${DEFAULT_SITE_URL.replace(/\/$/, "")}/og-cover.jpg`;
export const LOGO_URL = `${DEFAULT_SITE_URL.replace(/\/$/, "")}/logo.png`;

const BASE_KEYWORDS = [
  "ИИ агенты",
  "AI agents",
  "AI агенттер",
  "нейросеть под ключ",
  "AI website studio",
  "цифровое агентство",
  "AI automation",
  "GPT-4o agents",
  "enterprise AI",
  "автоматизация бизнеса",
  "AI сайт на заказ",
  "AI assistant",
  "no-code AI",
];

const routeSeo: Record<SeoRoute, Record<AppLocale, RouteMeta>> = {
  home: {
    ru: {
      title: "Aura Studio — AI агенты, сайты и продукты",
      description:
        "Студия полного цикла: проектируем AI-агентов, создаём премиальные сайты, CRM и мобильные приложения с аналитикой и интеграциями.",
      keywords: [
        "создание AI агентов",
        "разработка AI сайтов",
        "студия ИИ Казахстан",
      ],
    },
    en: {
      title: "Aura Studio — AI Agents & High-End Websites",
      description:
        "Boutique product team that designs AI agents, conversion websites, SaaS dashboards, and mobile apps with deep analytics.",
      keywords: [
        "build ai agents",
        "ai website development",
        "ai agency central asia",
      ],
    },
    kk: {
      title: "Aura Studio — AI агенттер және веб-сайттар",
      description:
        "AI агенттерін, премиум веб-сайттарды, CRM және мобильді қосымшаларды аналитикасымен жасап беретін студия.",
      keywords: [
        "AI агент жасау",
        "AI сайт әзірлеу",
        "қазақстан ai студиясы",
      ],
    },
  },
  about: {
    ru: {
      title: "О студии Aura Studio — эксперты по AI и digital",
      description:
        "10+ специалистов, которые формируют стратегию, дизайн и разработки AI-решений, комплексных сайтов и мобильных приложений.",
      keywords: [
        "команда ai экспертов",
        "цифровое агентство aura studio",
        "опыт ai проектов",
      ],
    },
    en: {
      title: "About Aura Studio — AI-first product team",
      description:
        "Cross-functional team covering research, design, engineering, AI automation, and growth for ambitious companies.",
      keywords: [
        "ai-first studio",
        "digital product experts",
        "ai engineering team",
      ],
    },
    kk: {
      title: "Aura Studio туралы — AI және digital мамандары",
      description:
        "Зерттеу, дизайн және әзірлеуді бір жерде біріктіретін, AI автоматтандыруын жасайтын команда.",
      keywords: [
        "ai команда қазақстан",
        "digital агенттік алматы",
        "aura studio тәжірибесі",
      ],
    },
  },
  pricing: {
    ru: {
      title: "Тарифы на AI-агентов и сайты — Aura Studio",
      description:
        "Прозрачные пакеты для запусков: AI ассистенты, лендинги, SaaS, мобильные приложения и техподдержка.",
      keywords: [
        "стоимость ai агента",
        "цены на ai сайт",
        "прайс aura studio",
      ],
    },
    en: {
      title: "Pricing for AI agents & websites — Aura Studio",
      description:
        "Modular pricing covering discovery, design, development, AI automation, and success enablement.",
      keywords: [
        "ai agent pricing",
        "ai website cost",
        "aura studio plans",
      ],
    },
    kk: {
      title: "Aura Studio тарифтері — AI агенттер мен сайттар",
      description:
        "AI ассистенттері, лендингтер, SaaS және мобильді жобаларға арналған икемді бағалар.",
      keywords: [
        "ai агент бағасы",
        "ai сайт құны",
        "aura studio тарифтері",
      ],
    },
  },
  contacts: {
    ru: {
      title: "Связаться с Aura Studio — AI агенты и сайты",
      description:
        "Оставьте заявку, чтобы обсудить AI-агента, сайт или мобильный продукт. Работаем с клиентами по всему миру.",
      keywords: [
        "связаться с aura studio",
        "заказать ai агента",
        "обсудить ai сайт",
      ],
    },
    en: {
      title: "Contact Aura Studio — AI agent & web team",
      description:
        "Book a call to scope your AI agent, automation, website, or mobile product. We respond within one business day.",
      keywords: [
        "contact ai agency",
        "book ai agent project",
        "aura studio contact",
      ],
    },
    kk: {
      title: "Aura Studio-пен байланыс — AI агент пен веб",
      description:
        "AI агент, сайт немесе мобильді өнімге қатысты сұранысты жіберіңіз. 1 жұмыс күні ішінде жауап береміз.",
      keywords: [
        "aura studio байланыс",
        "ai агент тапсырыс",
        "ai сайт сұрау",
      ],
    },
  },
};

const routeSpecificKeywords: Record<SeoRoute, string[]> = {
  home: ["ai digital studio", "ai business growth"],
  about: ["ai experts profile", "product leadership"],
  pricing: ["ai subscription", "startup pricing ai"],
  contacts: ["book ai consultation", "ai discovery call"],
};

function dedupeKeywords(keywords: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  keywords.forEach((keyword) => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    result.push(keyword.trim());
  });

  return result;
}

export function normalizeLocale(locale?: string): AppLocale {
  if (!locale) return "ru";
  if (locale.startsWith("en")) return "en";
  if (locale.startsWith("kk")) return "kk";
  return "ru";
}

export function getRouteSeo(
  route: SeoRoute,
  locale: string | undefined,
): RouteMeta {
  const normalizedLocale = normalizeLocale(locale);
  const routeData = routeSeo[route][normalizedLocale];

  return {
    ...routeData,
    keywords: dedupeKeywords([
      ...BASE_KEYWORDS,
      ...routeData.keywords,
      ...routeSpecificKeywords[route],
    ]),
    image: DEFAULT_OG_IMAGE,
  };
}

