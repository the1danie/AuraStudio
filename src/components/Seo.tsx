import { Helmet } from "react-helmet-async";
import {
  BRAND_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_SITE_URL,
  LOGO_URL,
} from "../seo.config";

type SeoProps = {
  title: string;
  description: string;
  keywords: string[];
  pathname: string;
  lang: string;
  image?: string;
};

const baseUrl = DEFAULT_SITE_URL.replace(/\/$/, "");

export function Seo({
  title,
  description,
  keywords,
  pathname,
  lang,
  image,
}: SeoProps) {
  const canonicalPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const compiledKeywords = keywords.join(", ");

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: canonicalUrl,
    inLanguage: lang,
    description,
    potentialAction: {
      "@type": "ContactAction",
      target: `${baseUrl}/contacts`,
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: baseUrl,
    logo: LOGO_URL,
    description,
    sameAs: [
      "https://wa.me/77713808908",
    ],
  };

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={compiledKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={BRAND_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${BRAND_NAME} logo`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${BRAND_NAME} logo`} />

      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
    </Helmet>
  );
}

