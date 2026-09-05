import BlogPost, { blogMetadata } from "@/app/_components/content/BlogPost";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { return blogMetadata((await params).slug, "pl"); }
export default async function Page({ params }: Props) { return <BlogPost slug={(await params).slug} locale="pl" />; }
