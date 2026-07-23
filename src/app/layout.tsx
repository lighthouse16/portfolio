import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-google",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hai Dang Trinh",
  description:
    "Computer Science student at PolyU Hong Kong. Building performant software at the intersection of algorithms, ML, and thoughtful design.",
  openGraph: {
    title: "Hai Dang Trinh",
    description:
      "Computer Science student at PolyU Hong Kong. Algorithms, machine learning, and thoughtful design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
