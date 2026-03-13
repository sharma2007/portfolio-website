import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: true });
const Awards = dynamic(() => import("@/components/Awards"), { ssr: true });
const Camps = dynamic(() => import("@/components/Camps"), { ssr: true });
const Certifications = dynamic(() => import("@/components/Certifications"), { ssr: true });
const Languages = dynamic(() => import("@/components/Languages"), { ssr: true });

export default function Home() {
  return (
    <>
      <div id="top" className="scroll-mt-0" />
      <Nav />
      <Hero />
      <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
        <About />
        <Resume />
        <Projects />
        <TechStack />
        <Awards />
        <Camps />
        <Certifications />
        <Languages />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
