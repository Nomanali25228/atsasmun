// 'use client'
// import React, { useContext } from 'react';
// import bgUSA from '@/app/public/img/bgUSA.jpg';
// import Dubaih from '@/app/(component)/dubai-header/Dubaih';
// import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
// import Map from '@/app/(component)/dubai-map/Map';
// import Desert from '@/app/(component)/dubai-desert/Desert';
// import Event from '@/app/(component)/dubai-event/Event';
// import Shedule from '@/app/(component)/dubai-shedule/Shedule';
// import Footer from '@/app/(component)/footer/Footer';
// import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
// import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
// import hotelx1 from '@/app/public/img/BgHotelVenueUSA4.avif';
// import hotelx2 from '@/app/public/img/BgHotelVenueUSA2.avif';
// import hotelx3 from '@/app/public/img/BgHotelVenueUSA3.avif';
// import hotelx4 from '@/app/public/img/BgHotelVenueUSA1.avif';
// import hotelx5 from '@/app/public/img/BgHotelVenueUSA5.avif';
// import event1 from '@/app/public/img/USAcommitteeSessions.jpg';
// import event2 from '@/app/public/img/USAculture.jpg';
// import event3 from '@/app/public/img/USAopenMcNight.jpg';
// import event4 from '@/app/public/img/USAopeniCeremony.jpg';
// import event5 from '@/app/public/img/USAscavengerHunt.jpg';
// import USAcity1 from "@/app/public/img/USAcity1.jpg";
// import USAcity2 from "@/app/public/img/USAcity2.jpg";
// import USAcity3 from "@/app/public/img/USAcity3.jpg";
// import ContextPage from '../Context/ContextPage';


// export default function Page() {

//   // ✅ Context se state lena
//   const { newyorkdates, setNewyorkdates } = useContext(ContextPage);

//   return (
//     <>
//       <Dubaih 
//         bgImage={bgUSA} 
//         tital="New York, USA" 
//         Pricelink="/USAfee" 
//         StartDays={newyorkdates.startdate}  
//         EndDays={newyorkdates.enddate}  
//         monthsDetils={`${newyorkdates.month}, ${newyorkdates.year}, East Brunswick Hotel`} 
//         style="text-blue-400" 
//         stlyle2="hover:text-blue-400" 
//       />

//       <AboutDubai 
//         aboutTitle="New York" 
//         about="ATSASMUN New York offers an unparalleled opportunity to engage in dynamic diplomacy at the heart of global influence—Times Square. Surrounded by the energy of the city that never sleeps and just steps from the United Nations headquarters, delegates will experience bold dialogue in a truly iconic setting. With diverse committees and thought-provoking topics, this conference promises an unforgettable and empowering experience, where the pulse of international relations beats strongest." 
//       />

//       <Desert 
//         heading="New York City Tour" 
//         Desert={USAcity1} 
//         Desert2={USAcity2} 
//         Desert3={USAcity3} 
//       />

//       <Map 
//         bgimg5={hotelx1} 
//         img1={hotelx2} 
//         img2={hotelx3} 
//         img3={hotelx4} 
//         img4={hotelx5} 
//         map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2532.9363860928624!2d-74.41136332484642!3d40.48009165178186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c621c111af0f%3A0xf6a3d20dff5c4484!2sHilton%20East%20Brunswick%20Hotel%20%26%20Executive%20Meeting%20Center!5e1!3m2!1sen!2s!4v1742234247488!5m2!1sen!2s" 
//         hname="Brunswick Hotel" 
//         disc="This modern hotel is six miles east of New Brunswick, NJ, near Rutgers University, and just off the New Jersey Turnpike, connecting you to New York within an hour. Enjoy our heated indoor pool, whirlpool, fitness center, and Starbucks® coffee in the lobby café." 
//       />

//       <Event 
//         img1={event1} 
//         img2={event2} 
//         img3={event3} 
//         img4={event4} 
//         img5={event5} 
//       />

//       <Shedule timeing="New York, USA" />

//       <ScrollToTop />
//       <Whatsapp />
//       <Footer />
//     </>
//   );
// }
