import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Awards from "@/components/Awards";
import Camps from "@/components/Camps";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";
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
        <Skills />
        <Resume />
        <Projects />
        <Awards />
        <Camps />
        <Certifications />
        <Languages />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
