import SiteLayout from "@/app/_components/SiteLayout";
export { metadata } from "@/app/_components/SiteLayout";
export default function Layout({ children }: { children: React.ReactNode }) { return <SiteLayout locale="en">{children}</SiteLayout>; }
