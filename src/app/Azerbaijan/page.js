// "use client";
// import React, { useContext } from "react";
// import Azerbaijan from "@/app/public/img/Azerbaijan.jpeg";
// import Dubaih from "@/app/(component)/dubai-header/Dubaih";
// import AboutDubai from "@/app/(component)/about-dubai/AboutDubai";
// import Map from "@/app/(component)/dubai-map/Map";
// import Desert from "@/app/(component)/dubai-desert/Desert";
// import Event from "@/app/(component)/dubai-event/Event";
// import Shedule from "@/app/(component)/dubai-shedule/Shedule";
// import Footer from "@/app/(component)/footer/Footer";
// import ScrollToTop from "@/app/(component)/Scrolltotop/ScrollToTop";
// import Whatsapp from "@/app/(component)/whatsapp/Whatsapp";
// import hotelx1 from "@/app/public/img/HotelVenueBaku1.avif";
// import hotelx2 from "@/app/public/img/HotelVenueBaku2.avif";
// import hotelx3 from "@/app/public/img/HotelVenueBaku3.avif";
// import hotelx4 from "@/app/public/img/BgHotelVenueBaku4.avif";
// import hotelx5 from "@/app/public/img/HotelVenueBAku5.avif";
// import event1 from "@/app/public/img/india-CommitteeSessions.jpg";
// import event2 from "@/app/public/img/india-culturalGlobalVillage.jpg";
// import event3 from "@/app/public/img/india-openMicCight.jpg";
// import event4 from "@/app/public/img/india-opening ceremony.jpg";
// import event5 from "@/app/public/img/india-scavengerHunt.jpg";
// import BAkuCity1 from "@/app/public/img/BakuCityTour1.jpeg";
// import BAkuCity2 from "@/app/public/img/BakuCityTour2.jpeg";
// import BAkuCity3 from "@/app/public/img/BakuCityTour3.jpeg";
// import ContextPage from "../Context/ContextPage";

// // ✅ Import context

// export default function Page() {
//   // ✅ Get data from Context instead of local state
//   const { bakudates } = useContext(ContextPage);

//   return (
//     <>
//       <Dubaih
//         bgImage={Azerbaijan}
//         tital="Baku, Azerbaijan"
//         Pricelink="/Azerbaijanfee"
//         StartDays={bakudates.startdate}
//         EndDays={bakudates.enddate}
//         monthsDetils={`${bakudates.month} ${bakudates.year}, Hilton Baku`}
//         style="text-blue-400"
//         stlyle2="hover:text-blue-400"
//       />

//       <AboutDubai
//         aboutTitle="Baku"
//         about="ATSASMUN Baku offers a unique platform to experience diplomacy in a city where history meets modern ambition. Nestled on the shores of the Caspian Sea, Baku blends ancient charm with cutting-edge progress. Delegates will engage in dynamic discussions, tackle global issues, and collaborate in a setting that reflects the spirit of resilience and innovation. With diverse committees and impactful topics, this conference promises a transformative experience in the heart of Azerbaijan."
//       />

//       <Desert
//         heading="Baku City Tour"
//         Desert={BAkuCity1}
//         Desert2={BAkuCity2}
//         Desert3={BAkuCity3}
//       />

//       <Map
//         bgimg5={hotelx4}
//         img1={hotelx2}
//         img2={hotelx3}
//         img3={hotelx1}
//         img4={hotelx5}
//         map="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2537.0060343690843!2d49.8496777!3d40.372112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dac39cb4bf1%3A0xbabf0162238cc76f!2sHilton%20Baku!5e1!3m2!1sen!2s!4v1748602221963!5m2!1sen!2s"
//         hname="Hilton Baku"
//         disc="At the heart of Baku's business district, overlooking the Caspian Sea. Steps from Baku Boulevard, Park Bulvar Mall, and two kilometers from Old Town. Enjoy family time, a full-service spa, and a rooftop bar with views."
//       />

//       <Event
//         img1={event1}
//         img2={event2}
//         img3={event3}
//         img4={event4}
//         img5={event5}
//       />

//       <Shedule timeing="Baku, Azerbaijan" />
//       <ScrollToTop />
//       <Whatsapp />
//       <Footer />
//     </>
//   );
// }
