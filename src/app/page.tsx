import Header from '@/components/ui/Header';
import Hero from '@/components/ui/Hero';
import Services from '@/components/ui/Services';
import Stats from '@/components/ui/Stats';
import About from '@/components/ui/About';
import DigitalExpertise from '@/components/ui/DigitalExpertise';
import Clients from '@/components/ui/Clients';
import Process from '@/components/ui/Process';
import CTA from '@/components/ui/CTA';
import Footer from '@/components/ui/Footer';
import ScrollArrow from '@/components/ui/ScrollArrow';

export default function Home() {
  return (
    <>
      <Header />
      <ScrollArrow />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Stats />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <DigitalExpertise />
        <div className="section-divider" />
        <Clients />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
