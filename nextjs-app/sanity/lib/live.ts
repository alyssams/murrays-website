// sanity/lib/live.ts
import { defineLive } from "next-sanity";
import { serverClient } from "./client";

// export const sanityFetch = defineLive({ client: serverClient });
const { sanityFetch, SanityLive } = defineLive({ client: serverClient });

export { sanityFetch, SanityLive };
