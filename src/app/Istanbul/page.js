"use client";
import React, { useContext } from "react";
import Dubaih from "@/app/(component)/dubai-header/Dubaih";
import istanbul from "@/app/public/img/turkey.jpeg";
import AboutDubai from "@/app/(component)/about-dubai/AboutDubai";
import Map from "@/app/(component)/dubai-map/Map";
import Desert from "@/app/(component)/dubai-desert/Desert";
import Event from "@/app/(component)/dubai-event/Event";
import Shedule from "@/app/(component)/dubai-shedule/Shedule";
import Footer from "@/app/(component)/footer/Footer";
import ScrollToTop from "@/app/(component)/Scrolltotop/ScrollToTop";
import Whatsapp from "@/app/(component)/whatsapp/Whatsapp";
import event1 from "@/app/public/img/Committee Sessions.png";
import event2 from "@/app/public/img/Cultural Global Village.jpg";
import event3 from "@/app/public/img/Open Mic Night.jpeg";
import event4 from "@/app/public/img/Opening Ceremony.jpg";
import event5 from "@/app/public/img/Scavenger Hunt.jpg";
import img12 from "@/app/public/img/turkeytour1.jpeg";
import img13 from "@/app/public/img/turkeytour2.jpeg";
import img14 from "@/app/public/img/turkeytour3.jpeg";
import ContextPage from "../Context/ContextPage";

// Euro Park Otel Images
const hotelx1 = "/img/Euro Park Otel-1.jpg";
const hotelx2 = "/img/Euro Park Otel-2.jpg";
const hotelx3 = "/img/Euro Park Otel-3.jpg";
const hotelx4 = "/img/Euro Park Otel-4.jpg";
const hotelx5 = "/img/Euro Park Otel-5.webp";

export default function Page() {
  // ✅ Get data from Context instead of local state
  // noman/////////
const {istanbuldates, setIstanbuldates} = useContext(ContextPage);
  return (
    <>
      <Dubaih
        bgImage={istanbul}
        tital="Istanbul, Turkey"
        Pricelink="/Istanbulfee"
        StartDays={istanbuldates.startdate}
        EndDays={istanbuldates.enddate}
        monthsDetils={`${istanbuldates.month} ${istanbuldates.year} Euro Park Otel`}
        style="text-blue-400"
        stlyle2="hover:text-blue-400"
      />
      <AboutDubai
        aboutTitle="Istanbul"
        about="Atsas International Model United Nations (Atsas MUN), the most prominent venue in Istanbul for the development of leadership skills, global discourse, and young diplomacy. Passionate students from all over the world come together for Atsas MUN to participate in thought-provoking discussions, work together to find answers to global problems, and hone their public speaking, negotiation, and critical thinking abilities."
      />
      <Desert
        heading="Istanbul City Tour"
        Desert={img12}
        Desert2={img13}
        Desert3={img14}
      />
      <Map
        bgimg5={hotelx1}
        img1={hotelx4}
        img2={hotelx3}
        img3={hotelx2}
        img4={hotelx5}
        map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.4515033952553!2d28.642941!3d41.01537700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f0944472211%3A0x5df99e24d97fb85e!2sEuro%20Park%20Otel!5e0!3m2!1sen!2s!4v1789481217430!5m2!1sen!2s"
        hname="Euro Park Otel"
        disc="Euro Park Otel is a modern and comfortable hotel located in the heart of Istanbul, Turkey. Offering premium hospitality with a perfect blend of contemporary design and Turkish warmth, it provides an ideal stay for delegates attending Atsas MUN. Conveniently situated near key landmarks, the hotel ensures easy access to Istanbul's vibrant culture and attractions."
      />
      <Event
        img1={event1}
        img2={event2}
        img3={event3}
        img4={event4}
        img5={event5}
      />
      <Shedule timeing="Istanbul, Turkey" />
      <ScrollToTop />
      <Whatsapp />
      <Footer />
    </>
  );
}
