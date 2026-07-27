'use client'
import Contact from "./(component)/contact/Contact";
import Events from "./(component)/events/Events";
import Faq from "./(component)/faq/Faq";
import Gallery from "./(component)/gallery/Gallery";
import AtsasMun from "./(component)/atsasMun/AtsasMun";
import OurMission from "./(component)/our mission/OurMission";
import Footer from "./(component)/footer/Footer";
import ScrollToTop from "./(component)/Scrolltotop/ScrollToTop";
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp'
import { useContext, useEffect } from "react";
import ContextPage from "./Context/ContextPage";
import HeroSection from "./(component)/herosection/HeroSection";

export default function Home() {
  const { refresh, setRefresh } = useContext(ContextPage);
  useEffect(() => {
    if (refresh == true) {
      window.location.reload();
      setRefresh(false);
    }
  }, []);

  return (
    <>
      {/* Ambient grain background overlay */}
      <div className="atsas-grain" />

      <HeroSection />
      <Events />
      <OurMission />
      <AtsasMun />
      <Gallery />
      <Faq />
      <Contact />
      <Footer />
      <ScrollToTop />
      <Whatsapp />
    </>
  );
}
