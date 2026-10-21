/** Core identity + links. Edit here; components never hard-code personal info. */

export interface SocialLink {
  id: "github" | "linkedin" | "leetcode" | "codechef" | "email";
  label: string;
  href: string;
  /** True while the real URL has not been supplied yet. */
  placeholder?: boolean;
}

export const profile = {
  name: "Harshit Gupta",
  initials: "HG",
  role: "Software Developer",
  degree: "B.Tech Computer Science & Engineering (AIML)",
  location: "Ghaziabad, India",
  email: "guptaharshit00006@gmail.com",
  siteUrl: "https://harshitinfo.vercel.app",
  headline: ["I", "build", "full-stack", "products", "and", "love", "solving", "problems."],
  roles: ["Software Developer", "Full-Stack Developer", "Problem Solver", "AIML Student"],
  intro:
    "I'm a Computer Science (AIML) student at ABES Engineering College. I build full-stack web apps, most recently a real-time marketplace for farmers (KishanMarket) and an AI-powered support ticketing system (SupportDesk AI) during my internship at Codec Technologies.",
} as const;

export const socials: SocialLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/harshit3003" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/harshitgupta0001" },
  { id: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/harshit_3003/" },
  // TODO: replace "#" with your CodeChef profile URL
  { id: "codechef", label: "CodeChef", href: "#", placeholder: true },
  { id: "email", label: "Email", href: `mailto:${profile.email}` },
];

export const githubUrl = "https://github.com/harshit3003";
