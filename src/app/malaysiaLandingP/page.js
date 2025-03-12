"use client"
import React, { useState } from 'react';
import malaysia from '@/app/public/img/kulua.jpg';
import Dubaih from '@/app/(component)/dubai-header/Dubaih';
import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
import Map from '@/app/(component)/dubai-map/Map'
import Desert from '@/app/(component)/dubai-desert/Desert';
import Event from '@/app/(component)/dubai-event/Event';
import Shedule from '@/app/(component)/dubai-shedule/Shedule';
import Footer from '@/app/(component)/footer/Footer';
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import hotelx1 from '@/app/public/img/HotelVenueMalaysia1.jpeg';
import hotelx2 from '@/app/public/img/HotelVenueMalaysia2.jpeg';
import hotelx3 from '@/app/public/img/HotelVenueMalaysia3.jpeg';
import hotelx4 from '@/app/public/img/bgHotelVenueMalaysia4.jpg';
import hotelx5 from '@/app/public/img/HotelVenueMalaysia5.jpeg';
import event1 from '@/app/public/img/CommitteeSessionsmalaysia.jpg'
import event2 from '@/app/public/img/CulturalGlobal Villagemalaysia.jpeg'
import event3 from '@/app/public/img/Open Mic Night.jpeg'
import event4 from '@/app/public/img/Opening Ceremony.jpg'
import event5 from '@/app/public/img/Scavenger Hunt.jpg'
import malaysiaCityTour1 from "@/app/public/img/malaysiaCityTour1.jpeg";
import malaysiaCityTour2 from "@/app/public/img/malaysiaCityTour2.jpeg";
import malaysiaCityTour3 from "@/app/public/img/malaysiaCityTour3.jpeg";

export default function Page() {
  
  return (
    <>
      <Dubaih  bgImage={malaysia} tital="Kuala Lumpur, Malaysia" Pricelink="/MalaysiaPrice" StartDays="1" sup="st" EndDays="04" sup1="th" monthsDetils="May, 2025, Sunway Putra Hotel" style="text-blue-400" stlyle2="hover:text-blue-400"/>
      <AboutDubai aboutTitle="Malaysia" about="Atsas MUN Kuala Lumpur provides a vibrant and inclusive atmosphere with varied committees and creative subjects that push members to think critically and work together productively. Delegates have the opportunity to experience the dynamic culture and contemporary allure of this famous city outside of the sessions." /> {/* Corrected prop passing */}
      <Desert  heading="City Tour Kuala Lumpur" Desert={malaysiaCityTour1} Desert2={malaysiaCityTour2} Desert3={malaysiaCityTour3} />
      <Map bgimg5={hotelx4} img1={hotelx2} img2={hotelx3} img3={hotelx1}  img4={hotelx5}  map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.9597093936086!2d101.6924194!3d3.1664255999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc483c80efbd8f%3A0x74d953b7c4a4a1e1!2sSunway%20Putra%20Hotel!5e1!3m2!1sen!2s!4v1734384702931!5m2!1sen!2s" hname="100 Jalan Putra, 50350 Kuala Lumpur, Malaysia
" disc="Situated directly opposite the World Trade Centre Kuala Lumpur, the 5-star Sunway Putra Hotel Kuala Lumpur is nestled in the heart of the diamond triangle, one of Kuala Lumpur’s most eclectic districts. Synonymous with vibrant street scenes, lined with local and trendy cafes and bars, bustling markets, landmarks, and a melting pot of Asian cultures and traditions, all of which can be easily explored.
"/>
      <Event img1={event1} img2={event2} img3={event3}  img4={event4} img5={event5} />
      <Shedule timeing='Kuala Lumpur, Malaysia'/>
      <ScrollToTop/>
      <Whatsapp/>
      <Footer/>

    </>
  );
}
