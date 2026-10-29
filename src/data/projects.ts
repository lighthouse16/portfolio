export interface ProjectMetrics {
  pageviews: number;
  uniqueVisitors: number;
  reportingPeriod: string;
  reportingPeriodFull: string;
  snapshotDate: string;
  source: string;
  usageLine: string;
  secondaryNote: string;
  summaryText: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  cardDescription: string;
  tags: string[];
  year: string;
  href: string;
  liveUrl: string;
  status: string;
  ctaLabel: string;
  statusSummary?: string;
  metrics?: ProjectMetrics;
}

const appLynkVisitors = 340;
const appLynkPageviews = 976;
const appLynkPeriod = "27 Sep to 28 Oct 2026";
const appLynkPeriodFull = "27 September and 28 October 2026";
const appLynkSnapshotDate = "28 October 2026";
const appLynkSource = "Vercel Web Analytics";

export const APPLYNK_METRICS: ProjectMetrics = {
  pageviews: appLynkPageviews,
  uniqueVisitors: appLynkVisitors,
  reportingPeriod: appLynkPeriod,
  reportingPeriodFull: appLynkPeriodFull,
  snapshotDate: appLynkSnapshotDate,
  source: appLynkSource,
  usageLine: `${appLynkVisitors} unique visitors · ${appLynkPageviews} pageviews`,
  secondaryNote:
    "Website traffic during the reporting period; not registered-user or application-conversion figures.",
  summaryText: `AppLynk recorded ${appLynkPageviews} pageviews and ${appLynkVisitors} unique visitors between ${appLynkPeriodFull}, according to ${appLynkSource}.`,
};

export const APPLYNK_PROJECT: ProjectData = {
  slug: "applynk",
  title: "AppLynk",
  subtitle: "AI-assisted opportunity discovery and data processing platform",
  cardDescription:
    "A bilingual opportunity discovery platform that turns fragmented web and social posts into structured, searchable listings.",
  tags: ["Applied AI", "Data Systems", "Information Retrieval", "Backend Engineering"],
  year: "2026",
  href: "/projects/applynk/",
  liveUrl: "https://applynk.io.vn/en",
  status: "Live web application",
  ctaLabel: "Live website",
  statusSummary:
    "AppLynk is available as a live Vietnamese and English opportunity discovery platform. The public website lets visitors browse and search structured opportunity listings.",
  metrics: APPLYNK_METRICS,
};

export const DEEPFLOOD_PROJECT: ProjectData = {
  slug: "deepflood",
  title: "DeepFlood",
  subtitle: "Leakage-aware hydrological time-series nowcasting",
  cardDescription:
    "A basin-specific machine learning system for same-day streamflow nowcasting using temporal modeling, leakage-aware validation, and peak-sensitive training.",
  tags: ["Time-Series ML", "Temporal Modeling", "Model Evaluation", "ML Engineering"],
  year: "2025",
  href: "/projects/deepflood/",
  liveUrl: "https://deepflood.haidangtrih.me/",
  status: "Research prototype · Evaluation dashboard",
  ctaLabel: "Live dashboard",
};

export const PROJECTS: ProjectData[] = [APPLYNK_PROJECT, DEEPFLOOD_PROJECT];
