import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow: ["/admin", "/api/"] },
    sitemap: "https://website.1206596087.workers.dev/sitemap.xml",
  };
}
