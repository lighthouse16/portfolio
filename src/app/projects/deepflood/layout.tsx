import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeepFlood | Hai Dang Trinh",
  description:
    "Same-day streamflow nowcasting prototype specific to the Long Đại basin.",
  openGraph: {
    title: "DeepFlood · Hydrological Nowcasting",
    description:
      "A basin-specific time-series model with leakage-aware validation and peak-sensitive training.",
    type: "article",
  },
};

export default function DeepFloodLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
