import { useTranslation } from "react-i18next";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Timeline } from "../components/Timeline";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Portfolio } from "../components/Portfolio";
import { Pricing } from "../components/Pricing";
import { Seo } from "../components/Seo";
import { getRouteSeo, normalizeLocale } from "../seo.config";

export function LandingPage() {
  const { i18n } = useTranslation();
  const lang = normalizeLocale(i18n.language);
  const seo = getRouteSeo("home", lang);

  return (
    <>
      <Seo {...seo} lang={lang} pathname="/" />
      <Hero />
      <Services />
      <Timeline />
      <WhyChooseUs />
      <Portfolio />
      <Pricing />
    </>
  );
}
