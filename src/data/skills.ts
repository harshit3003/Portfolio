export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { id: "languages", title: "Languages", items: ["C++", "Python", "JavaScript"] },
  { id: "frontend", title: "Frontend", items: ["HTML5", "CSS3", "React.js"] },
  { id: "databases", title: "Databases", items: ["MySQL"] },
  {
    id: "data",
    title: "Data Analysis & Visualisation",
    items: ["NumPy", "Pandas", "Matplotlib"],
  },
  {
    id: "familiar",
    title: "Familiar with",
    items: ["Git", "GitHub", "Tailwind CSS", "Seaborn"],
  },
];

/** Flat list feeding the marquee rows (no percentages, no invented tools). */
export const marqueeRowA = ["C++", "Python", "JavaScript", "HTML5", "CSS3", "React.js", "MySQL"];
export const marqueeRowB = ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Git", "GitHub", "Tailwind CSS"];
