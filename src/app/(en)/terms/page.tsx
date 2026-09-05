import Content from "@/app/_components/content/Terms";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("terms", "en");
export default function Page() { return <Content locale="en" />; }
