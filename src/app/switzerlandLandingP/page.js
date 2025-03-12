"use client"
import React, { useState } from 'react';
import Switzerland from '@/app/public/img/geneva.jpg';
import Dubaih from '@/app/(component)/dubai-header/Dubaih';
import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
import Map from '@/app/(component)/dubai-map/Map'
import Desert from '@/app/(component)/dubai-desert/Desert';
import Event from '@/app/(component)/dubai-event/Event';
import Shedule from '@/app/(component)/dubai-shedule/Shedule';
import Footer from '@/app/(component)/footer/Footer';
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import hotelx1 from '@/app/public/img/HotelVenueSwitzerland2.jpeg';
import hotelx2 from '@/app/public/img/HotelVenueSwitzerland3.webp';
import hotelx3 from '@/app/public/img/HotelVenueSwitzerland4.webp';
import hotelx4 from '@/app/public/img/bgHotelVenueSwitzerland1.jpeg';
import hotelx5 from '@/app/public/img/HotelVenueSwitzerland5.webp';
import event1 from '@/app/public/img/CommitteeSessionsSwitzerland.jpeg'
import event2 from '@/app/public/img/CulturalGlobalVillageSwitzerland.jpg'
import event3 from '@/app/public/img/OpenmicnightSwitzerland.jpeg'
import event4 from '@/app/public/img/openingveremonySwitzerland.png'
import event5 from '@/app/public/img/ScavengerHuntSwitzerland.jpeg'
import SwitzerlandCityTour1 from "@/app/public/img/SwitzerlandCityTour1.jpeg";
import SwitzerlandCityTour2 from "@/app/public/img/SwitzerlandCityTour2.webp";
import SwitzerlandCityTour3 from "@/app/public/img/SwitzerlandCityTour3.jpeg";


export default function Page() {

  return (
    <>
      <Dubaih bgImage={Switzerland} tital="Geneva, Switzerland" Pricelink="/SwitzerlandPrice" StartDays="3" sup="rd" EndDays="6" sup1="th" monthsDetils="July, 2025, Sunway Putra Hotel" style="text-blue-400" stlyle2="hover:text-blue-400" />
      <AboutDubai aboutTitle="Switzerland" about="Atsas MUN Geneva provides a singular opportunity to immerse oneself in the realm of diplomacy while discovering the cultural and historical richness of this magnificent city, which is known for being the home of the United Nations and other international organizations. This conference promises to be a remarkable experience with its different committees and thought-provoking subjects." /> {/* Corrected prop passing */}
      <Desert heading="City Tour Geneva" Desert={SwitzerlandCityTour1} Desert2={SwitzerlandCityTour2} Desert3={SwitzerlandCityTour3} />
      <Map bgimg5={hotelx4} img1={hotelx2} img2={hotelx3} img3={hotelx1} img4={hotelx5} map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2303.822103677854!2d6.1067274000000005!3d46.224903600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c649b8bb5a98f%3A0x65a874771597b82c!2sCrowne%20Plaza%20Geneva%2C%20an%20IHG%20Hotel!5e1!3m2!1sen!2s!4v1734384957985!5m2!1sen!2s"    hname="Crowne Plaza Geneva, an IHG Hotel
" disc="Discover a new definition of contemporary comfort at the Paris Marriott Charles de Gaulle Airport Hotel. With a complimentary shuttle, our airport hotel at Charles de Gaulle (CDG) provides access to the terminal 2 B/D. Visit nearby attractions such as the Paris-Nord Villepinte Exhibition Center, Aéroville shopping center, and Parc Astérix. Explore our renowned restaurant for delicious cuisine....
"/>
      <Event img1={event1} img2={event2} img3={event3} img4={event4} img5={event5} />
      <Shedule timeing='Geneva, Switzerland' />
      <ScrollToTop />
      <Whatsapp />
      <Footer />

    </>
  );
}
