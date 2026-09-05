import Content from "@/app/_components/content/About";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("about", "pl");
export default function Page() { return <Content locale="pl" />; }
