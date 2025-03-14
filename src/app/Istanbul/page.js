"use client"
import React, { useState } from 'react';
import Dubaih from '@/app/(component)/dubai-header/Dubaih';
import istanbul from '@/app/public/img/turkey.jpeg';
import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
import Map from '@/app/(component)/dubai-map/Map'
import Desert from '@/app/(component)/dubai-desert/Desert';
import Event from '@/app/(component)/dubai-event/Event';
import Shedule from '@/app/(component)/dubai-shedule/Shedule';
import Footer from '@/app/(component)/footer/Footer';
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import hotelx1 from '@/app/public/img/bgHotelVenueIstanbul1.jpeg';
import hotelx2 from '@/app/public/img/HotelVenueIstanbul2.jpeg';
import hotelx3 from '@/app/public/img/HotelVenueIstanbul3.jpeg';
import hotelx4 from '@/app/public/img/HotelVenueIstanbul4.jpeg';
import hotelx5 from '@/app/public/img/HotelVenueIstanbul5.jpeg';
import event1 from '@/app/public/img/Committee Sessions.png'
import event2 from '@/app/public/img/Cultural Global Village.jpg'
import event3 from '@/app/public/img/Open Mic Night.jpeg'
import event4 from '@/app/public/img/Opening Ceremony.jpg'
import event5 from '@/app/public/img/Scavenger Hunt.jpg'
import img12 from "@/app/public/img/turkeytour1.jpeg"
import img13 from "@/app/public/img/turkeytour2.jpeg"
import img14 from "@/app/public/img/turkeytour3.jpeg"

export default function Page() {
  return (
    <>
      <Dubaih bgImage={istanbul} tital="Istanbul, Turkey" Pricelink="/IstanbulPrice" StartDays="05" sup="th" EndDays="08" sup1="th" monthsDetils="June 2025 Euro Park Otel, Esenyurt" style="text-blue-400" stlyle2="hover:text-blue-400"/>
      <AboutDubai aboutTitle="Istanbul" about="Atsas International Model United Nations (Atsas MUN), the most prominent venue in Istanbul for the development of leadership skills, global discourse, and young diplomacy. Passionate students from all over the world come together for Atsas MUN to participate in thought-provoking discussions, work together to find answers to global problems, and hone their public speaking, negotiation, and critical thinking abilities." /> {/* Corrected prop passing */}
      <Desert  heading="Istanbul City Tour" Desert={img12} Desert2={img13} Desert3={img14} />
      <Map bgimg5={hotelx1} img1={hotelx4} img2={hotelx3} img3={hotelx2}  img4={hotelx5} map="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2512.6294448910903!2d28.642941!3d41.01537700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1734119354107!5m2!1sen!2s"  hname="Euro Park Otel." disc="Our aim is to be noticed in Turkey and Istanbul with our service and quality standards, to combine national and international standards with Turkish hospitality so that our guests prefer us, to be one of the actors that directs the sector and to create our brand value. Euro Park Hotel also aims for new investments in the tourism and hotel management field, which is the rising value of Turkey.
"/>
      <Event img1={event1} img2={event2} img3={event3}  img4={event4} img5={event5} />
      <Shedule timeing='Istanbul, Turkey' />
      <ScrollToTop/>
      <Whatsapp/>
      <Footer />
    </>
  );
}
  // const images = [hotelx1, hotelx2, hotelx3, hotelx4];
