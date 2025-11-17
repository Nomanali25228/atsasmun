"use client";
import React, { useContext } from "react";
import Riyadh from "@/app/public/img/riyadhcity.jpg";
import Dubaih from "@/app/(component)/dubai-header/Dubaih";
import AboutDubai from "@/app/(component)/about-dubai/AboutDubai";
import Map from "@/app/(component)/dubai-map/Map";
import Desert from "@/app/(component)/dubai-desert/Desert";
import Event from "@/app/(component)/dubai-event/Event";
import Shedule from "@/app/(component)/dubai-shedule/Shedule";
import Footer from "@/app/(component)/footer/Footer";
import ScrollToTop from "@/app/(component)/Scrolltotop/ScrollToTop";
import Whatsapp from "@/app/(component)/whatsapp/Whatsapp";

import hotelx1 from "@/app/public/img/Saudiroom.avif";
import hotelx2 from "@/app/public/img/Saudilobby.avif";
import hotelx3 from "@/app/public/img/Saudipool.avif";
import hotelx4 from "@/app/public/img/Saudiconferen.avif";
import hotelx5 from "@/app/public/img/Saudirooms.avif";
import event1 from "@/app/public/img/Saudicommittee sessions.jpg";
import event2 from "@/app/public/img/Saudicultural night.jpg";
import event3 from "@/app/public/img/Saudiscavenger hunt.jpg";
import event4 from "@/app/public/img/Saudiopen mic.jpg";
import event5 from "@/app/public/img/SaudiOpening Ceremony.jpg";
import SaudiCityTour11 from "@/app/public/img/SaudiAl Faisaliah Tower.jpg";
import SaudiCityTour2 from "@/app/public/img/SaudiBoulevard Riyadh City.jpg";
import SaudiCityTour3 from "@/app/public/img/SaudiKingdom Centre Tower.jpg";
import ContextPage from "../Context/ContextPage";

export default function Page() {
  // ✅ Context se state lena (no local useState)
  const { saudidates, setSaudidates } = useContext(ContextPage);

  return (
    <>
      <Dubaih
        bgImage={Riyadh}
        tital="Riyadh, Saudi Arabia"
        Pricelink="/Saudifee"
        StartDays={saudidates.startdate}
        EndDays={saudidates.enddate}
        monthsDetils={`${saudidates.month}, ${saudidates.year}, Hilton Riyadh Hotel`}
        style="text-blue-400"
        stlyle2="hover:text-blue-400"
      />

      <AboutDubai
        aboutTitle="Riyadh"
        about="ATSASMUN Riyadh offers a distinctive opportunity to engage in forward-thinking diplomacy at the crossroads of tradition and innovation. Set in the vibrant capital of Saudi Arabia, delegates will explore bold dialogue against the backdrop of a city rich in cultural heritage and rapidly emerging as a global hub. With diverse committees and thought-provoking topics, this conference promises an unforgettable experience—where the spirit of collaboration meets the future of international relations."
      />

      <Desert
        heading="Riyadh City Tour"
        Desert={SaudiCityTour11}
        Desert2={SaudiCityTour2}
        Desert3={SaudiCityTour3}
      />

      <Map
        bgimg5={hotelx4}
        img1={hotelx2}
        img2={hotelx3}
        img3={hotelx1}
        img4={hotelx5}
        map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.294418600351!2d46.7282078!3d24.785402599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2efdbf7e64c3bf%3A0xd108e52d1e0ebe78!2sHilton%20Riyadh%20Hotel%20%26%20Residences!5e1!3m2!1sen!2s!4v1748600810275!5m2!1sen!2s"
        hname="Hilton Riyadh Hotel"
        disc="One kilometer from Granada Mall with shopping, restaurants, hypermarket and games area for kids, and steps from the Granada Metro Station. The Financial Plaza is 17 km away, while Al Bujairi Heritage Park and the National Museum are within 22 km. The hotel features residential apartments, rooms and suites, an indoor pool, and a local shuttle."
      />

      <Event
        img1={event1}
        img2={event2}
        img3={event3}
        img4={event4}
        img5={event5}
      />

      <Shedule timeing="Riyadh, Saudi Arabia" />

      <ScrollToTop />
      <Whatsapp />
      <Footer />
    </>
  );
}
