"use server";

import { headers } from "next/headers";

const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/DH6o6JfsOEmE8DN6KPH5LO";

export async function revealWhatsAppCommunityLink(): Promise<string> {
  const requestHeaders = await headers();
  const fetchSite = requestHeaders.get("sec-fetch-site");

  if (fetchSite && fetchSite !== "same-origin") {
    throw new Error("The community link can only be revealed from this site.");
  }

  return WHATSAPP_COMMUNITY_URL;
}
