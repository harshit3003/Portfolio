export interface Certification {
  id: string;
  title: string;
  issuer: string;
  detail?: string;
  year?: string;
}

export const certifications: Certification[] = [
  {
    id: "eda",
    title: "Exploratory Data Analysis",
    issuer: "FutureSkills Prime, NASSCOM",
    detail: "Gold Category, 79%",
    year: "2026",
  },
  {
    id: "deloitte",
    title: "Deloitte Technology Job Simulation",
    issuer: "Forage",
  },
  {
    id: "mcp",
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
  },
];
