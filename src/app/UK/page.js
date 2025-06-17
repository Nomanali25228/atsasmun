// "use client"
// import React, { useState } from 'react';
// import london from '@/app/public/img/london.jpg';
// import Dubaih from '@/app/(component)/dubai-header/Dubaih';
// import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
// import Map from '@/app/(component)/dubai-map/Map'
// import Desert from '@/app/(component)/dubai-desert/Desert';
// import Event from '@/app/(component)/dubai-event/Event';
// import Shedule from '@/app/(component)/dubai-shedule/Shedule';
// import Footer from '@/app/(component)/footer/Footer';
// import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
// import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
// import hotelx1 from '@/app/public/img/HotelVenueLonden2.avif';
// import hotelx2 from '@/app/public/img/HotelVenueLonden3.avif';
// import hotelx3 from '@/app/public/img/HotelVenueLonden4.avif';
// import hotelx4 from '@/app/public/img/bgHotelVenueLonden1.avif';
// import hotelx5 from '@/app/public/img/HotelVenueLonden6.avif';
// import event1 from '@/app/public/img/Committee SessionsLonden.jpg'
// import event2 from '@/app/public/img/Cultural Global VillageLonden.jpg'
// import event3 from '@/app/public/img/Open Mic NightLonden.jpg'
// import event4 from '@/app/public/img/Opening Ceremony.jpg'
// import event5 from '@/app/public/img/ScavengerHuntParis.jpeg'
// import ParisCityTour1 from "@/app/public/img/LondenCityTour1.jpeg";
// import ParisCityTour2 from "@/app/public/img/LondenCityTour2.jpg";
// import ParisCityTour3 from "@/app/public/img/LondenCityTour3.jpeg";


// export default function Page() {

//   return (
//     <>
//       <Dubaih bgImage={london} tital="London, UK" Pricelink="/UKfee" StartDays="28" sup="th" EndDays="31" sup1="st" monthsDetils="August, 2025, Hilton London Heathrow Airport Terminal 5" style="text-blue-400" stlyle2="hover:text-blue-400" />
//       <AboutDubai aboutTitle="London" about="Atsas MUN, which takes place in the famous setting of one of the liveliest cities on earth, blends scholarly debates with the exceptional chance to experience London's rich history and vibrant atmosphere. With a variety of committees and thoughtfully chosen subjects, attendees will come away feeling motivated and equipped to change the world" /> {/* Corrected prop passing */}
//       <Desert heading="London City Tour " Desert={ParisCityTour1} Desert2={ParisCityTour2} Desert3={ParisCityTour3} />
//       <Map bgimg5={hotelx4} img1={hotelx2} img2={hotelx3} img3={hotelx1} img4={hotelx5} hname="Hilton London Heathrow Airport Terminal 5" disc="Discover a new definition of contemporary comfort at the Paris Marriott Charles de Gaulle Airport Hotel. With a complimentary shuttle, our airport hotel at Charles de Gaulle (CDG) provides access to the terminal 2 B/D. Visit nearby attractions such as the Paris-Nord Villepinte Exhibition Center, Aéroville shopping center, and Parc Astérix. Explore our renowned restaurant for delicious cuisine..
// "  map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d66368.56360512052!2d-0.5998988145629968!3d51.47764464623016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487671ac497e8653%3A0x11e7982beaab587b!2sHilton%20London%20Heathrow%20Airport%20Terminal%205!5e1!3m2!1sen!2s!4v1744110372853!5m2!1sen!2s" />
//       <Event img1={event1} img2={event2} img3={event3} img4={event4} img5={event5} />
//       <Shedule timeing='London, UK'/>
//       <ScrollToTop />
//       <Whatsapp />
//       <Footer />

//     </>
//   );
// }