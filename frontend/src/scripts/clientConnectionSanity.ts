import SanityClient from "@sanity/client";

export const client = SanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-11-16", // use current UTC date - see "specifying API version"!
  token: import.meta.env.VITE_SANITY_API_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});
