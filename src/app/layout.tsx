import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import "@/components/LineSidebar.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hai Dang Trinh | Computer Science, Applied AI & Data Systems",
  description:
    "Computer Science student at PolyU building and evaluating applied AI systems, machine learning pipelines, and data-driven software.",
  openGraph: {
    title: "Hai Dang Trinh | Computer Science, Applied AI & Data Systems",
    description:
      "Applied AI, machine learning evaluation, and data-driven software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,slnt,wdth,wght,ROND@8..144,-10..0,25..150,100..1000,0..100&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital@0;1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Symbols:opsz,wght,FILL,GRAD,ROND@40..48,300,0..1,0,50&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
