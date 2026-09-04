import Courts from "@/app/_components/content/Courts";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("courts", "pl");
export default function Page() { return <Courts locale="pl" />; }
