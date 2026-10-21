import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Practice from "@/components/sections/Practice";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

/** Server Component: composes the sections; each section opts into "use client" only where needed. */
export default function Page() {
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Practice />
        <Journey />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
