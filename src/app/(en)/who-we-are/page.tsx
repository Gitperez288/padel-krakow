import Content from "@/app/_components/content/About";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("about", "en");
export default function Page() { return <Content locale="en" />; }
