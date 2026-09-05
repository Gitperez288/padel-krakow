import Content from "@/app/_components/content/Guidelines";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("guidelines", "en");
export default function Page() { return <Content locale="en" />; }
