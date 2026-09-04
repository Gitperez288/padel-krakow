import Courts from "@/app/_components/content/Courts";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("courts", "en");
export default function Page() { return <Courts locale="en" />; }
