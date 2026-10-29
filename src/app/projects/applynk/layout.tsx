import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AppLynk | Hai Dang Trinh",
  description:
    "How AppLynk turns fragmented youth opportunities into structured data, semantic search, and profile-aware discovery.",
  alternates: {
    canonical: "https://haidangtrih.me/projects/applynk/",
  },
  openGraph: {
    title: "AppLynk · Opportunity Discovery and Data Pipeline",
    description:
      "A full-stack case study in structured extraction, duplicate control, vector retrieval, and database-backed task processing.",
    url: "https://haidangtrih.me/projects/applynk/",
    type: "article",
  },
};

export default function AppLynkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
