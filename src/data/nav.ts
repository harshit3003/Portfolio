export interface NavItem {
  id: string;
  label: string;
  /** Two-digit index used in the mono eyebrow labels, e.g. `// 02 — projects`. */
  index: string;
}

export const navItems: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "projects", label: "Projects", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "practice", label: "Practice", index: "04" },
  { id: "journey", label: "Journey", index: "05" },
  { id: "certifications", label: "Certs", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];
