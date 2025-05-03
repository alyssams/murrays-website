// web/nextjs-app/sanity/lib/publicClient.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/lib/api";

export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
