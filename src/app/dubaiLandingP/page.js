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
      <Dubaih  bgImage={dubai} tital="Dubai, UAE" Pricelink="/uaePrice" StartDays="17" sup="th" EndDays="20" sup1="th" monthsDetils="April, 2025, Meydan Hotel, Meydan"  style="text-blue-400" stlyle2="hover:text-blue-400"/>
      <AboutDubai aboutTitle="Dubai" about="Atsas MUN offers top-notch academic simulations together with the chance to experience one of the most famous cities in the world, all while being held in the center of Dubai, a worldwide center of innovation and culture. Every participant is guaranteed an enriching experience, encouraging growth, connection, and inspiration, thanks to our different committees and thoughtfully chosen themes." /> 
      <Desert  heading="Desert Safari" Desert={DeseetSafariDinner} Desert2={DesertDinnerCamps} Desert3={DesertSafari1} />
      <Map bgimg5={hotelx1} img1={hotelx4} img2={hotelx3} img3={hotelx2}  img4={hotelx5} map="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d1310.005774151477!2d55.30037628418914!3d25.1562985245495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e4!4m3!3m2!1d25.155959!2d55.3002797!4m5!1s0x3e5f688c5516ea0f%3A0x44800f32689f57e2!2sThe%20Meydan%20Hotel%20-%20Meydan%20Racecourse%20Al%20Meydan%20Road%2C%20Nad%20Al%20Sheba%20-%20Dubai%20-%20United%20Arab%20Emirates!3m2!1d25.155658!2d55.3003012!5e1!3m2!1sen!2s!4v1734384411560!5m2!1sen!2s" hname="Meydan Hotel, Meydan Dubai, UAE
" disc="Located within fifteen minutes drive from the airport and ten minutes to the heart of the city and Dubai Mall, the Meydan Hotel combines contemporary luxury with exceptional dining options, outstanding infinity pool,  world-class golfing range and tennis facilities, all next to the world-famous Meydan horse-racing track."/>
      <Event img1={event1} img2={event2} img3={event3}  img4={event4} img5={event5} />
      <Shedule timeing='Dubai, UAE'/>
      <ScrollToTop/>
      <Whatsapp/>
      <Footer/>

    </>
  );
}