import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Awards from "@/components/Awards";
import Camps from "@/components/Camps";
import Certifications from "@/components/Certifications";
import Languages from "@/components/Languages";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

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
