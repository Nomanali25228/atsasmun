"use client"
import React, { useState } from 'react';
import Riyadh from '@/app/public/img/riyadhcity.jpg';
import Dubaih from '@/app/(component)/dubai-header/Dubaih';
import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
import Map from '@/app/(component)/dubai-map/Map'
import Desert from '@/app/(component)/dubai-desert/Desert';
import Event from '@/app/(component)/dubai-event/Event';
import Shedule from '@/app/(component)/dubai-shedule/Shedule';
import Footer from '@/app/(component)/footer/Footer';
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import hotelx1 from '@/app/public/img/Saudiroom.avif';
import hotelx2 from '@/app/public/img/Saudilobby.avif';
import hotelx3 from '@/app/public/img/Saudipool.avif';
import hotelx4 from '@/app/public/img/Saudiconferen.avif';
import hotelx5 from '@/app/public/img/Saudirooms.avif';
import event1 from '@/app/public/img/Saudicommittee sessions.jpg'
import event2 from '@/app/public/img/Saudicultural night.jpg'
import event3 from '@/app/public/img/Saudiscavenger hunt.jpg'
import event4 from '@/app/public/img/Saudiopen mic.jpg'
import event5 from '@/app/public/img/SaudiOpening Ceremony.jpg'
import SaudiCityTour11 from "@/app/public/img/SaudiAl Faisaliah Tower.jpg";
import SaudiCityTour2 from "@/app/public/img/SaudiBoulevard Riyadh City.jpg";
import SaudiCityTour3 from "@/app/public/img/SaudiKingdom Centre Tower.jpg";


export default function Page() {

  return (
    <>
      <Dubaih bgImage={Riyadh} tital="Riyadh, Saudi Arabia" Pricelink="/SaudiPrice" StartDays="16" sup="th" EndDays="19" sup1="th" monthsDetils="october, 2025, Hilton Riyadh Hotel
" style="text-blue-400" stlyle2="hover:text-blue-400" />
      <AboutDubai aboutTitle="Riyadh
" about="ATSASMUN Riyadh offers a distinctive opportunity to engage in forward-thinking diplomacy at the crossroads of tradition and innovation. Set in the vibrant capital of Saudi Arabia, delegates will explore bold dialogue against the backdrop of a city rich in cultural heritage and rapidly emerging as a global hub. With diverse committees and thought-provoking topics, this conference promises an unforgettable experience—where the spirit of collaboration meets the future of international relations.
" /> {/* Corrected prop passing */}
      <Desert heading="Riyadh City Tour" Desert={SaudiCityTour11} Desert2={SaudiCityTour2} Desert3={SaudiCityTour3} />
      <Map bgimg5={hotelx4} img1={hotelx2} img2={hotelx3} img3={hotelx1} img4={hotelx5} map="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2532.941421316346!2d-74.4093007!3d40.4799582!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c621c111af0f%3A0xf6a3d20dff5c4484!2sHilton%20East%20Brunswick%20Hotel%20%26%20Executive%20Meeting%20Center!5e1!3m2!1sen!2s!4v1742244753311!5m2!1sen!2s"    hname="Hilton East Brunswick Hotel & Executive" disc="This hotel is six miles east of New Brunswick, NJ, near Rutgers University, and right off the New Jersey Turnpike, connecting you to New York in an hour. Enjoy our heated pool, whirlpool, fitness center, and Starbucks® coffee in the lobby café."/>
      <Event img1={event1} img2={event2} img3={event3} img4={event4} img5={event5} />
      <Shedule timeing='Riyadh, Saudi Arabia' />
      <ScrollToTop />
      <Whatsapp />
      <Footer />

    </>
  );
}
