export type JourneyKind = "education" | "internship" | "leadership";

export interface JourneyItem {
  id: string;
  kind: JourneyKind;
  title: string;
  org: string;
  period?: string;
  meta?: string;
  points: string[];
}

/** Timeline items (internship, education) run newest first; leadership roles render as a separate group. */
export const journey: JourneyItem[] = [
  {
    id: "codec-internship",
    kind: "internship",
    title: "Web Developer Intern",
    org: "Codec Technologies Pvt. Ltd.",
    period: "Sep 2026 – Oct 2026",
    meta: "1-month AICTE & ICAC approved internship · Hybrid",
    points: [
      "Built SupportDesk AI, an AI-based customer support ticketing system that classifies tickets automatically, using Next.js, Python (ML), Node.js and MongoDB.",
      "It also does AI-powered ticket routing and SLA tracking, with dashboards for agent performance and customer satisfaction analytics.",
    ],
  },
  {
    id: "abes",
    kind: "education",
    title: "B.Tech, Computer Science & Engineering (AIML)",
    org: "ABES Engineering College, Ghaziabad",
    period: "Oct 2023 – Present",
    meta: "GPA 7.33 / 10",
    points: [],
  },
  {
    id: "stmarys",
    kind: "education",
    title: "Senior Secondary (PCM)",
    org: "St. Mary's Senior Secondary School",
    period: "2018 – 2022",
    points: [],
  },
  {
    id: "technovation-pr",
    kind: "leadership",
    title: "PR and Outreach Head",
    org: "Technovation Club (ABESEC)",
    points: [
      "Promoted technical events like TypoBuzz through outreach and publicity.",
      "Worked with the team on coordination, communication and promotion.",
      "Planned events with teammates so everything ran smoothly.",
    ],
  },
  {
    id: "cyberquest",
    kind: "leadership",
    title: "Event Organizer & Team Manager, CyberQuest",
    org: "Technovation Club (ABESEC)",
    points: ["Organised CyberQuest with the team: a quiz round followed by a team treasure hunt."],
  },
  {
    id: "salaah",
    kind: "leadership",
    title: "Graphic Designer",
    org: "Salaah Community",
    points: [
      "Designed social media posts and promotional material for the community's activities.",
      "Helped shape the community's look and online presence.",
    ],
  },
];
