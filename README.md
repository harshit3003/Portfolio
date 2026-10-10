# 🚀 Harshit Gupta — Interactive Developer Portfolio

<div align="center">

  <a href="https://portfolio-harshit-ec30.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://linkedin.com/in/harshit-gupta-ba76052a6" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://leetcode.com/u/harshit_3003/" target="_blank">
    <img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode" />
  </a>
  <a href="https://github.com/harshit3003" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-24292e?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="mailto:guptaharshit00006@gmail.com">
    <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>

  <br/><br/>

  [![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
  [![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

  <p align="center">
    <strong>A high-performance, immersive 3D developer portfolio featuring scroll-driven avatar animations, interactive Three.js workspace, and multilingual support.</strong>
  </p>

  <p align="center">
    <a href="https://portfolio-harshit-ec30.vercel.app/" target="_blank"><strong>🌐 Live Demo</strong></a> •
    <a href="https://github.com/harshit3003/Portfolio">View Repository</a> •
    <a href="#-featured-projects">Featured Projects</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>

</div>

---

## 🌟 Highlights & Key Features

- 🎭 **Scroll-Driven Avatar Transitions**: Frame-perfect GSAP ScrollTrigger transitions syncing 3D character movements from idle to interactive poses.
- 💻 **Interactive 3D Desk (Three.js)**: Custom interactive 3D workspace model with hover detection (Laptop, Monitor, Coffee, Trophy) and dynamic orbital controls.
- 📊 **Bento Grid Skills Dashboard**: Modern Bento UI presenting programming proficiencies, frontend/backend engineering capabilities, and data structures problem-solving stats.
- 🎞️ **Horizontal Parallax Project Showcase**: Pinned fullscreen horizontal carousel featuring smooth multi-layer parallax scrolling.
- 🎨 **Adaptive Theme Engine**: Seamless Dark / Light mode toggling powered by styled-components theme context.
- 🧲 **Micro-Interactions**: Magnetic physics-based buttons, custom cursor dynamics, preloader animation, and responsive UI scaling.

---

## 🛠️ Tech Stack

### Frontend & UI
- **Core Framework**: [Next.js 15](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling**: [Styled Components](https://styled-components.com/) with SSR Registry
- **3D Graphics & Canvas**: [Three.js](https://threejs.org/) & React Three Fiber ecosystem
- **Animation Engine**: [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger, Timeline, Parallax)
- **Typography & Icons**: Google Fonts (Space Grotesk, JetBrains Mono, Inter, Anton) & React Icons

### Backend & Databases
- **Languages**: Python, C / C++, JavaScript
- **Databases & Querying**: MySQL, Relational Database Modeling
- **Architectural Concepts**: Object-Oriented Programming (OOP), Data Structures & Algorithms (460+ Solved)

---

## 💼 Featured Projects

### 1. 📈 Stock Market Dashboard
> **FinTech / Quantitative Analytics** | *Python, React.js, Vite, MySQL*
- Quantitative financial fundamentals and stock market analytics visualizer.
- Features multi-year revenue trends, net margin distributions, liquidity current ratio modeling, correlation matrix heatmaps, and company drill-down analysis across **440+ listed companies**.

### 2. 🌾 Kishan Market
> **Agritech Marketplace** | *React.js, Vite, Python, MySQL*
- Direct peer-to-peer agricultural marketplace connecting farmers directly with commercial buyers.
- Eliminates intermediaries through real-time price discovery, dynamic bidding & counter-offers, integrated communication, and synchronized database pipelines.

---

## 📂 Project Structure

```bash
Portfolio/
├── personal-portfolio/
│   ├── public/
│   │   ├── avatar/            # Frame sequences (idle, scroll, action)
│   │   ├── models/            # 3D assets & GLB models (laptop, desk items)
│   │   ├── projects/          # High-resolution project screenshots & demos
│   │   └── videos/            # Ambient videos & animations
│   ├── src/
│   │   ├── app/               # Next.js App Router (layout, page, icon)
│   │   ├── components/
│   │   │   ├── sections/      # Navbar, Hero, About (3D Desk), Skills, Projects, Contact, Footer
│   │   │   ├── MagneticButton.js
│   │   │   ├── PreferencesPopup.js
│   │   │   └── Preloader.js
│   │   ├── context/           # ThemeContext, LanguageContext (i18n)
│   │   ├── data/              # Projects, Skills, and Testimonials data
│   │   ├── i18n/              # Translation dictionaries & language configuration
│   │   └── styles/            # GlobalStyles & Theme configurations
│   ├── package.json
│   └── next.config.mjs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshit3003/Portfolio.git
   cd Portfolio/personal-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) to view the live portfolio.

### Building for Production
```bash
npm run build
npm run start
```

---

## 📬 Connect with Me
- **Developer**: Harshit Gupta
- **Role**: Software Developer | Computer Science (AIML) Student
- **🌐 Live Portfolio**: [https://portfolio-harshit-ec30.vercel.app/](https://portfolio-harshit-ec30.vercel.app/)
- **💼 LinkedIn**: [linkedin.com/in/harshit-gupta-ba76052a6](https://linkedin.com/in/harshit-gupta-ba76052a6)
- **💡 LeetCode**: [@harshit_3003](https://leetcode.com/u/harshit_3003/)
- **🐙 GitHub**: [@harshit3003](https://github.com/harshit3003)
- **📫 Email**: [guptaharshit00006@gmail.com](mailto:guptaharshit00006@gmail.com)

---

<div align="center">
  <sub>Built with ❤️ using React, Next.js, and Three.js. © 2026 Harshit Gupta.</sub>
</div>
