import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Hai Dang Trinh",
  description:
    "Get in touch with Hai Dang Trinh for collaborations, technical opportunities, or applied AI discussions.",
  alternates: {
    canonical: "https://haidangtrih.me/contact/",
  },
  openGraph: {
    title: "Contact | Hai Dang Trinh",
    description:
      "Get in touch with Hai Dang Trinh for collaborations, technical opportunities, or applied AI discussions.",
    url: "https://haidangtrih.me/contact/",
    type: "website",
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
