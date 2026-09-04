import Home from "@/app/_components/content/Home";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("home", "en");
export const revalidate = 60;
export default function Page() { return <Home locale="en" />; }
