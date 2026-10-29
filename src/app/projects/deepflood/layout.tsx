import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeepFlood | Hai Dang Trinh",
  description:
    "Same-day streamflow nowcasting prototype specific to the Long Đại basin.",
  alternates: {
    canonical: "https://haidangtrih.me/projects/deepflood/",
  },
  openGraph: {
    title: "DeepFlood · Hydrological Nowcasting",
    description:
      "A basin-specific time-series model with leakage-aware validation and peak-sensitive training.",
    url: "https://haidangtrih.me/projects/deepflood/",
    type: "article",
  },
};

export default function DeepFloodLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
