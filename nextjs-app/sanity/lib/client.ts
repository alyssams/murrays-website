// web/nextjs-app/sanity/lib/client.ts

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/lib/api";

const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset || !apiVersion) {
  throw new Error("Missing required Sanity configuration (projectId, dataset, or apiVersion)");
}

// For public-facing, published content (CDN optimized)
export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// For authenticated server-side content (e.g., draft previews)
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: "previewDrafts",
});
