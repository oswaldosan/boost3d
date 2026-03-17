import Header from '@/components/ui/Header';
import Hero from '@/components/ui/Hero';
import Services from '@/components/ui/Services';
import CaseStudies from '@/components/ui/CaseStudies';
import WhyChooseUs from '@/components/ui/WhyChooseUs';
import Process from '@/components/ui/Process';
import Testimonials from '@/components/ui/Testimonials';
import CTA from '@/components/ui/CTA';
import Footer from '@/components/ui/Footer';
import ScrollArrow from '@/components/ui/ScrollArrow';

export default function Home() {
  return (
    <>
      <Header />
      <ScrollArrow />
      <main>
        <Hero />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <CaseStudies />
        <div className="section-divider" />
        <WhyChooseUs />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
