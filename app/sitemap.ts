import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://lesaion.world/", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://lesaion.world/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: "https://lesaion.world/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
