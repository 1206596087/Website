import type { MetadataRoute } from "next";

const baseUrl = "https://website.1206596087.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/library`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
