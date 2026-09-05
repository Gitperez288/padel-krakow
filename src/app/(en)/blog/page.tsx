import Blog from "@/app/_components/content/Blog";
import { pageMetadata } from "@/lib/page-metadata";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata("blog", "en");
export default function Page() { return <Blog locale="en" />; }
