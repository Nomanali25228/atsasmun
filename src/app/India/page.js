"use client"
import React, { useState } from 'react';
import India from '@/app/public/img/india.jpg';
import Dubaih from '@/app/(component)/dubai-header/Dubaih';
import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
import Map from '@/app/(component)/dubai-map/Map'
import Desert from '@/app/(component)/dubai-desert/Desert';
import Event from '@/app/(component)/dubai-event/Event';
import Shedule from '@/app/(component)/dubai-shedule/Shedule';
import Footer from '@/app/(component)/footer/Footer';
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import hotelx1 from '@/app/public/img/HotelVenueIndia1.webp';
import hotelx2 from '@/app/public/img/HotelVenueIndia2.webp';
import hotelx3 from '@/app/public/img/HotelVenueIndia3.webp';
import hotelx4 from '@/app/public/img/BgHotelVenueIndia4.webp';
import hotelx5 from '@/app/public/img/HotelVenueIndia5.webp';
import event1 from '@/app/public/img/india-CommitteeSessions.jpg'
import event2 from '@/app/public/img/india-culturalGlobalVillage.jpg'
import event3 from '@/app/public/img/india-openMicCight.jpg'
import event4 from '@/app/public/img/india-opening ceremony.jpg'
import event5 from '@/app/public/img/india-scavengerHunt.jpg'
import GoaBeach1 from "@/app/public/img/Goa-Beach1.jpg";
import GoaBeach2 from "@/app/public/img/Goa-Beach2.jpg";
import GoaBeach3 from "@/app/public/img/Goa-Beach3.jpg";

export default function Page() {

  return (
    <>
      <Dubaih bgImage={India} tital="Goa, India" Pricelink="/Indiafee" StartDays="26" sup="th" EndDays="29" sup1="th" monthsDetils="June, 2025, Grand Hyatt Goa" style="text-blue-400" stlyle2="hover:text-blue-400" />
      <AboutDubai aboutTitle="Goa" about="ATSASMUN Goa provides a unique chance to see the rich cultural legacy and breathtaking scenery of this coastal treasure while immersing oneself in the world of diplomacy. Goa, which is well-known for its extensive history and international ties, offers a distinctive setting for audacious discussion and cooperation. This conference promises to be an amazing and enriching event with its different committees and thought-provoking subjects." /> {/* Corrected prop passing */}
      <Desert heading="Goa City Beach" Desert={GoaBeach1} Desert2={GoaBeach2} Desert3={GoaBeach3} />
      <Map bgimg5={hotelx4} img1={hotelx2} img2={hotelx3} img3={hotelx1} img4={hotelx5} map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3209.6853401304!2d73.84978647416662!3d15.451390655683461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb8a991555555%3A0xb9238d62be942f9a!2sGrand%20Hyatt%20Goa!5e1!3m2!1sen!2s!4v1742167537412!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" hname="Grand Hyatt Goa" disc="Grand Hyatt Goa overlooks the visually stunning waters of the Bambolim Bay. This hotel in Goa spreads across 28 acres of colourful, tropical gardens and lush lawns that roll down to the water’s edge."/>
      <Event img1={event1} img2={event2} img3={event3} img4={event4} img5={event5} />
      <Shedule timeing='Goa, India' />
      <ScrollToTop />
      <Whatsapp />
      <Footer />

    </>
  );
}
