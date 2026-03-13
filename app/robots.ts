import { MetadataRoute } from "next";

const SITE_URL = "https://sohamsharma.info";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
