export interface Project {
  id: string;
  title: string;
  subtitle: string;
  featured?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
  link: { label: string; href: string; placeholder?: boolean };
}

export const projects: Project[] = [
  {
    id: "kishanmarket",
    title: "KishanMarket",
    subtitle: "Agricultural Supply Chain Marketplace",
    featured: true,
    summary:
      "A full-stack marketplace where farmers list crops, manage inventory and connect directly with wholesale buyers through product listings and purchase requests.",
    highlights: [
      "A React.js, Vite and Tailwind CSS frontend with separate dashboards for farmers and buyers, interactive maps and Hindi–English language support.",
      "Real-time bidding, counter-offers and private buyer–seller chat, built with Node.js, Express.js and Socket.io.",
      "SQLite3 and MongoDB Atlas (Mongoose) handle storage and sync, and data is restored after server restarts and deployments.",
      "Order tracking, shipment management, GST invoices, dispute handling and an admin dashboard.",
    ],
    tags: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Socket.io",
      "SQLite3",
      "MongoDB Atlas",
    ],
    link: { label: "Live Demo", href: "https://kishanmarket.onrender.com/" },
  },
  {
    id: "stock-dashboard",
    title: "Stock Market Fundamentals Dashboard",
    subtitle: "Financial data analysis in Python",
    summary:
      "A Python dashboard that looks at company financial data from 2012 to 2016, built with NumPy, Pandas, Matplotlib and Seaborn.",
    highlights: [
      "Charts comparing revenue, net income, assets, profitability, liquidity and overall performance.",
      "A scoring system that ranks companies on five financial indicators, including profit margin, returns, liquidity and leverage.",
      "Filters for fiscal year, company ticker and metrics, and dashboards you can export as high-resolution images.",
    ],
    tags: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
    link: { label: "GitHub", href: "https://github.com/harshit3003/Stock-Market-Dashboard" },
  },
];
