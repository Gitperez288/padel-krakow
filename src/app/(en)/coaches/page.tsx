import Content from "@/app/_components/content/Coaches";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("coaches", "en");
export default function Page() { return <Content locale="en" />; }
