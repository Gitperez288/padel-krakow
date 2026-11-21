"use server";

import { headers } from "next/headers";

export async function revealWhatsAppCommunityLink(): Promise<string> {
  const requestHeaders = await headers();
  const fetchSite = requestHeaders.get("sec-fetch-site");

  if (fetchSite && fetchSite !== "same-origin") {
    throw new Error("The community link can only be revealed from this site.");
  }

  const inviteUrl = process.env.WHATSAPP_COMMUNITY_URL;
  if (!inviteUrl) {
    throw new Error("The community invite is unavailable.");
  }

  return inviteUrl;
}
