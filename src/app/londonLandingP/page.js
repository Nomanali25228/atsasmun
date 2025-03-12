'use client'
import React, { useState } from 'react';
import london from '@/app/public/img/london.jpg';
import Dubaih from '@/app/(component)/dubai-header/Dubaih';
import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
import Map from '@/app/(component)/dubai-map/Map'
import Desert from '@/app/(component)/dubai-desert/Desert';
import Event from '@/app/(component)/dubai-event/Event';
import Shedule from '@/app/(component)/dubai-shedule/Shedule';
import Footer from '@/app/(component)/footer/Footer';
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import hotelx1 from '@/app/public/img/HotelVenueLonden1.avif';
import hotelx2 from '@/app/public/img/HotelVenueLonden2.avif';
import hotelx3 from '@/app/public/img/HotelVenueLonden3.avif';
import hotelx4 from '@/app/public/img/HotelVenueLonden4.avif';
import hotelx5 from '@/app/public/img/HotelVenueLonden5.avif';
import event1 from '@/app/public/img/CommitteSessionsLonden.jpg';
import event2 from '@/app/public/img/Cultural Global VillageLonden.jpg';
import event3 from '@/app/public/img/Open Mic NightLonden.jpg';
import event4 from '@/app/public/img/Opening Ceremony.jpg';
import event5 from '@/app/public/img/Scavenger Hunt.jpg';
import LondenCityTour1 from "@/app/public/img/LondenCityTour1.jpeg";
import LondenCityTour2 from "@/app/public/img/LondenCityTour2.jpg";
import LondenCityTour3 from "@/app/public/img/LondenCityTour3.jpeg";


export default function Page(props) {

  return (
    <>
      <Dubaih bgImage={london} tital="London, UK" Pricelink="/LondonPrice" StartDays="12" sup="th" EndDays="15" sup1="th" monthsDetils="June, 2025, Hilton London Heathrow Airport Terminal 5" style="text-blue-400" stlyle2="hover:text-blue-400" />
      <AboutDubai aboutTitle="London" about="Atsas MUN, which takes place in the famous setting of one of the liveliest cities on earth, blends scholarly debates with the exceptional chance to experience London's rich history and vibrant atmosphere. With a variety of committees and thoughtfully chosen subjects, attendees will come away feeling motivated and equipped to change the world." /> {/* Corrected prop passing */}
      <Desert heading="City Tour LONDON" Desert={LondenCityTour1} Desert2={LondenCityTour3} Desert3={LondenCityTour2} />
      <Map bgimg5={hotelx1} img1={hotelx2} img2={hotelx3} img3={hotelx4} img4={hotelx5} map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2074.02116151719!2d-0.5174978!3d51.477566599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487671ac497e8653%3A0x11e7982beaab587b!2sHilton%20London%20Heathrow%20Airport%20Terminal%205!5e1!3m2!1sen!2s!4v1734384839682!5m2!1sen!2s" hname="Hilton London Heathrow Airport Terminal 5" disc="With its varied committees and cutting-edge subjects that push participants to think critically and work together productively, Atsas MUN Kuala Lumpur provides a welcoming and exciting atmosphere. Delegates have the opportunity to experience the dynamic culture and contemporary allure of this famous city outside of the sessions." />
      <Event img1={event1} img2={event2} img3={event3} img4={event4} img5={event5} />
      <Shedule timeing='London, UK'/>
      <ScrollToTop />
      <Whatsapp />
      <Footer />
    </>
  );
}
