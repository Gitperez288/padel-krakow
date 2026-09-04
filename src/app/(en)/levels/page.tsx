import Levels from "@/app/_components/content/Levels";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("levels", "en");
export default function Page() { return <Levels locale="en" />; }
