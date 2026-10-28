import type { MetadataRoute } from "next";
import { siteUrl, socialCards } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(socialCards).map(({ path }) => ({
    url: new URL(path, siteUrl).href,
  }));
}
