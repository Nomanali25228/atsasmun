"use client"
import React, { useState } from 'react';
import Dubaih from '@/app/(component)/dubai-header/Dubaih';
import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
import dubai from "@/app/public/img/skyline.jpeg";
import Map from '@/app/(component)/dubai-map/Map'
import Desert from '@/app/(component)/dubai-desert/Desert';
import Event from '@/app/(component)/dubai-event/Event';
import Shedule from '@/app/(component)/dubai-shedule/Shedule';
import Footer from '@/app/(component)/footer/Footer';
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import hotelx1 from '@/app/public/img/bgHotelVenuedubai1.avif';
import hotelx2 from '@/app/public/img/HotelVenuedubai2.avif';
import hotelx3 from '@/app/public/img/HotelVenuedubai3.avif';
import hotelx4 from '@/app/public/img/HotelVenuedubai4.avif';
import hotelx5 from '@/app/public/img/HotelVenuedubai5.avif';
import event1 from '@/app/public/img/duabiCommittee Sessions.jpg'
import event2 from '@/app/public/img/dubaiCultural GlobalVillage.jpeg'
import event3 from '@/app/public/img/duabiMicNight.jpeg'
import event4 from '@/app/public/img/Opening Ceremony.jpg'
import event5 from '@/app/public/img/Scavenger Hunt.jpg'
import DeseetSafariDinner from "@/app/public/img/DeseetSafariDinner.jpeg"
import DesertDinnerCamps from "@/app/public/img/DesertDinnerCamps.jpg"
import DesertSafari1 from "@/app/public/img/DesertSafari1.jpg"




export default function Page() {

  return (
    <>
      <Dubaih bgImage={dubai} tital="Dubai, UAE" Pricelink="/uaePrice" StartDays="2" sup="nd" EndDays="05" sup1="th" monthsDetils="May, 2025, Meydan Hotel, Meydan" style="text-blue-400" stlyle2="hover:text-blue-400" />
      <AboutDubai aboutTitle="Dubai" about="Atsas MUN offers top-notch academic simulations together with the chance to experience one of the most famous cities in the world, all while being held in the center of Dubai, a worldwide center of innovation and culture. Every participant is guaranteed an enriching experience, encouraging growth, connection, and inspiration, thanks to our different committees and thoughtfully chosen themes." />
      <Desert heading="Desert Safari" Desert={DeseetSafariDinner} Desert2={DesertDinnerCamps} Desert3={DesertSafari1} />
      <Map bgimg5={hotelx1} img1={hotelx4} img2={hotelx3} img3={hotelx2} img4={hotelx5} map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d376.7757589586041!2d55.299970984918254!3d25.15581725010392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f688c5516ea0f%3A0x44800f32689f57e2!2sThe%20Meydan%20Hotel!5e1!3m2!1sen!2sus!4v1742271411150!5m2!1sen!2sus" hname="Meydan Hotel, Meydan Dubai, UAE" disc="Just 15 minutes from the airport and 10 minutes from Dubai Mall, The Meydan Hotel offers modern luxury with fine dining, an infinity pool, a top-tier golf range, tennis facilities, and a prime location by the world-famous Meydan racetrack." />
      <Event img1={event1} img2={event2} img3={event3} img4={event4} img5={event5} />
      <Shedule timeing='Dubai, UAE' />
      <ScrollToTop />
      <Whatsapp />
      <Footer />

    </>
  );
}