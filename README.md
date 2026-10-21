# ⚡ Harshit Gupta — Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-harshitinfo.vercel.app-ff6b3d?style=for-the-badge&logo=vercel&logoColor=white)](https://harshitinfo.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A modern, high-performance personal developer portfolio built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **Lenis Smooth Scroll**. Designed with curated typography, dark/light themes, dynamic aurora glows, and fluid micro-interactions.

🌐 **Live Website**: [https://harshitinfo.vercel.app](https://harshitinfo.vercel.app/)

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [⚙️ Content Configuration](#️-content-configuration)
- [🎨 Design System & Theming](#-design-system--theming)
- [🌐 Deployment](#-deployment)
- [📫 Connect with Me](#-connect-with-me)
- [📄 License](#-license)

---

## ✨ Features

- **⚡ Blazing Fast Performance**: Built on Next.js 16 with Turbopack and React 19 Server Components for instant initial page loads and rapid hydration.
- **🌊 Lenis Smooth Scrolling**: Decoupled momentum scrolling paired with Framer Motion for silky 60fps animations.
- **⌨️ Command Palette (`Cmd + K` / `Ctrl + K`)**: Built using `cmdk` for instant keyboard navigation between sections, toggling themes, copying profile info, or launching external links.
- **🌗 Theme Toggle (Dark & Light Mode)**: Fully integrated with `next-themes` and CSS custom properties; persists preference without layout shift or theme flash.
- **🌌 Dynamic Visual Effects**:
  - Ambient **Aurora glow & mesh grid** backdrop.
  - Interactive **Spotlight Glow cards** that respond dynamically to pointer coordinates.
  - **Magnetic Buttons** with elastic physics for interactive elements.
  - **3D Tilt Profile Card** with subtle perspective transforms.
  - **Dual-row infinite Marquee** showcasing core technologies.
- **📊 Coding Practice Stats**: Interactive animated number counters (`CountUp`) tracking **250+ LeetCode** problems and **250+ CodeChef** challenges solved with relevant topic tags.
- **💼 Comprehensive Project Showcase**:
  - **KishanMarket**: Full-stack agricultural supply chain marketplace with real-time bidding, counter-offers, buyer-seller chat, order tracking, and GST invoicing. ([Live Demo](https://kishanmarket.onrender.com/))
  - **Stock Market Fundamentals Dashboard**: Interactive Python data analytics application evaluating corporate financial indicators (NumPy, Pandas, Matplotlib, Seaborn). ([GitHub](https://github.com/harshit3003/Stock-Market-Dashboard))
- **🗺️ Journey Timeline & Leadership**: Chronological timeline detailing education (B.Tech CSE AIML at ABESEC), internship experience at Codec Technologies (building SupportDesk AI), and leadership initiatives.
- **📜 Certifications Showcase**: Displays verified credentials in Exploratory Data Analysis (NASSCOM Gold), Deloitte Technology Job Simulation, and Anthropic MCP.
- **📬 Contact & Quick Actions**:
  - One-click **Copy Email** with real-time feedback toast.
  - Direct mail client launcher and accessible contact form.
- **🔍 Full SEO & Open Graph Suite**:
  - Canonical URL configuration pointing to [https://harshitinfo.vercel.app](https://harshitinfo.vercel.app/).
  - Dynamic Open Graph social image generated with `@vercel/og` (`opengraph-image.tsx`).
  - Automated `sitemap.xml` and `robots.txt` generation.
  - Structured data (`Schema.org` Person entity) for rich search snippets.
  - Full keyboard accessibility and `noscript` fallback for reveal animations.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) (Strict mode) |
| **Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Modules / Variables |
| **Animations** | [Framer Motion 12](https://motion.dev/) |
| **Smooth Scroll** | [Lenis 1.3](https://lenis.darkroom.engineering/) |
| **Command Palette** | [cmdk 1.1](https://cmdk.paco.me/) |
| **Theming** | [next-themes 0.4](https://github.com/pacocoursey/next-themes) |
| **Icons** | [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) |
| **Fonts** | Space Grotesk, Inter, JetBrains Mono via `next/font/google` |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
portfolio(final)/
├── public/                     # Static assets (profile image, favicon, etc.)
│   └── profile.jpg
├── src/
│   ├── app/                    # Next.js App Router root
│   │   ├── globals.css         # Tailwind v4 theme, design tokens & glass styles
│   │   ├── icon.tsx            # Dynamic favicon generator (HG monogram)
│   │   ├── layout.tsx          # Root layout, fonts, metadata, JSON-LD Schema
│   │   ├── opengraph-image.tsx # Dynamic OG image generated via @vercel/og
│   │   ├── page.tsx            # Composition of all portfolio sections
│   │   ├── robots.ts           # Dynamic robots.txt
│   │   └── sitemap.ts          # Dynamic sitemap.xml
│   ├── components/
│   │   ├── effects/            # Aurora, SmoothScroll, CustomCursor, Preloader
│   │   ├── layout/             # Navbar, Footer, CommandPalette, BackToTop
│   │   ├── sections/           # Hero, About, Projects, Skills, Practice, Journey, Certifications, Contact
│   │   └── ui/                 # MagneticButton, SpotlightCard, TiltCard, Chip, Marquee, Reveal, Toaster
│   ├── data/                   # Content source files (data-driven architecture)
│   │   ├── certifications.ts   # Certificates & credentials
│   │   ├── journey.ts          # Education, internship & leadership timeline
│   │   ├── nav.ts              # Navigation links
│   │   ├── practice.ts         # LeetCode & CodeChef stats and tags
│   │   ├── profile.ts          # Core identity, bio, social links, deployed domain
│   │   ├── projects.ts         # Featured & regular project cards
│   │   └── skills.ts           # Categorized toolkits and marquee rows
│   ├── hooks/                  # Custom React hooks (useActiveSection, useFinePointer, useScrollDirection)
│   └── lib/                    # Utilities, Framer Motion easings, toast notifications
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and npm scripts
├── postcss.config.mjs          # PostCSS configuration for Tailwind CSS v4
├── tsconfig.json               # TypeScript strict configuration
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js** >= `18.18.0` (Recommended: `v20` or `v24`)
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harshit3003/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

4. **Verify TypeScript types**:
   ```bash
   npm run typecheck
   ```

5. **Create a production build**:
   ```bash
   npm run build
   npm start
   ```

---

## ⚙️ Content Configuration

All profile data, projects, links, and content are centralized in [`src/data/`](src/data). You can customize your portfolio without modifying component logic:

| Content Area | Configuration File | Description |
| :--- | :--- | :--- |
| **Personal Bio & Links** | [`src/data/profile.ts`](src/data/profile.ts) | Name, role, email, headline words, bio, social links, and site domain (`siteUrl`). |
| **Projects** | [`src/data/projects.ts`](src/data/projects.ts) | Titles, summaries, feature highlights, tech tags, and live demo / GitHub links. |
| **Skills & Toolkits** | [`src/data/skills.ts`](src/data/skills.ts) | Categorized skill groups (Languages, Frontend, Databases, etc.) and marquee rows. |
| **Problem Solving** | [`src/data/practice.ts`](src/data/practice.ts) | LeetCode & CodeChef problem counters and topics. |
| **Journey & Timeline** | [`src/data/journey.ts`](src/data/journey.ts) | Education history, internship experience, and leadership positions. |
| **Certifications** | [`src/data/certifications.ts`](src/data/certifications.ts) | Completed courses, issuing organizations, and grades. |
| **Theme & Tokens** | [`src/app/globals.css`](src/app/globals.css) | Color palettes, glow radii, and typography variables. |

---

## 🎨 Design System & Theming

The portfolio follows an intentional, sleek aesthetic:

- **Typography**:
  - Headings: `Space Grotesk` (expressive, geometric)
  - Body Copy: `Inter` (neutral, readable)
  - Code / Accents: `JetBrains Mono` (developer-first aesthetic)
- **Glassmorphism**: Backdrop blur with subtle border highlights (`backdrop-blur-md`, `border-fg/10`).
- **Color Palettes**:
  - **Dark Mode** *(Default)*: Deep charcoal obsidian (`#0c0b0a`) with warm amber (`#ff6b3d`) and golden sunrise (`#e8c170`) accents.
  - **Light Mode**: Clean parchment canvas (`#f5f1e9`) with high-contrast text and crisp card surfaces.

---

## 🌐 Deployment

The portfolio is deployed directly on **[Vercel](https://vercel.com/)** with continuous deployment on pushes to `main`.

### Deploy Your Own:
1. Fork or push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New... → Project**.
3. Import your repository (Vercel automatically detects Next.js settings).
4. Click **Deploy**.
5. Under **Settings → Domains**, add your custom domain and update `siteUrl` in [`src/data/profile.ts`](src/data/profile.ts).

---

## 📫 Connect with Me

- **Live Portfolio**: [harshitinfo.vercel.app](https://harshitinfo.vercel.app/)
- **GitHub**: [@harshit3003](https://github.com/harshit3003)
- **LinkedIn**: [Harshit Gupta](https://www.linkedin.com/in/harshitgupta0001)
- **LeetCode**: [harshit_3003](https://leetcode.com/u/harshit_3003/)
- **Email**: [guptaharshit00006@gmail.com](mailto:guptaharshit00006@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to explore, learn from, or adapt the code for your own portfolio.
