import Community from "@/app/_components/content/Community";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("community", "en");
export default function Page() { return <Community locale="en" />; }
