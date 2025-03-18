// "use client"
// import React, { useState } from 'react';
// import paris from '@/app/public/img/paris.jpeg';
// import Dubaih from '@/app/(component)/dubai-header/Dubaih';
// import AboutDubai from '@/app/(component)/about-dubai/AboutDubai';
// import Map from '@/app/(component)/dubai-map/Map'
// import Desert from '@/app/(component)/dubai-desert/Desert';
// import Event from '@/app/(component)/dubai-event/Event';
// import Shedule from '@/app/(component)/dubai-shedule/Shedule';
// import Footer from '@/app/(component)/footer/Footer';
// import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
// import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
// import hotelx1 from '@/app/public/img/HotelVenueParis1.avif';
// import hotelx2 from '@/app/public/img/HotelVenueParis2.avif';
// import hotelx3 from '@/app/public/img/HotelVenueParis3.avif';
// import hotelx4 from '@/app/public/img/bgHotelVenueParis4.jpeg';
// import hotelx5 from '@/app/public/img/HotelVenueParis5.avif';
// import event1 from '@/app/public/img/CommitteeSessionsParis.jpeg'
// import event2 from '@/app/public/img/CulturalGlobalVillageParis.jpeg'
// import event3 from '@/app/public/img/OpenMicParis.jpeg'
// import event4 from '@/app/public/img/OpeningCeremonyParis.png'
// import event5 from '@/app/public/img/ScavengerHuntParis.jpeg'
// import ParisCityTour1 from "@/app/public/img/ParisCityTour1.jpg";
// import ParisCityTour2 from "@/app/public/img/ParisCityTour2.jpg";
// import ParisCityTour3 from "@/app/public/img/ParisCityTour3.webp";


// export default function Page() {

//   return (
//     <>
//       <Dubaih bgImage={paris} tital="Paris, France" Pricelink="/FrancePrice" StartDays="7" sup="th" EndDays="10" sup1="th" monthsDetils="August, 2025, Paris Marriott Charles de Gaulle Airport Hotel" style="text-blue-400" stlyle2="hover:text-blue-400" />
//       <AboutDubai aboutTitle="France" about="Atsas MUN Paris, which takes place in one of the most famous cities in the world, combines academic brilliance with the chance to take in Paris's fascinating history, culture, and allure. Participants will depart with fresh insights, abilities, and relationships because to the varied committees and interesting subjects." /> {/* Corrected prop passing */}
//       <Desert heading="City Tour Paris" Desert={ParisCityTour1} Desert2={ParisCityTour2} Desert3={ParisCityTour3} />
//       <Map bgimg5={hotelx4} img1={hotelx2} img2={hotelx3} img3={hotelx1} img4={hotelx5} hname="Paris Marriott Charles de Gaulle Airport Hotel." disc="Discover a new definition of contemporary comfort at the Paris Marriott Charles de Gaulle Airport Hotel. With a complimentary shuttle, our airport hotel at Charles de Gaulle (CDG) provides access to the terminal 2 B/D. Visit nearby attractions such as the Paris-Nord Villepinte Exhibition Center, Aéroville shopping center, and Parc Astérix. Explore our renowned restaurant for delicious cuisine..
// "  map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2184.5868252653763!2d2.5203001!3d49.0026991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6159d469e5c53%3A0x36244c0962c0fa79!2sParis%20Marriott%20Charles%20de%20Gaulle%20Airport%20Hotel!5e1!3m2!1sen!2s!4v1734385089318!5m2!1sen!2s" />
//       <Event img1={event1} img2={event2} img3={event3} img4={event4} img5={event5} />
//       <Shedule timeing='Paris, France'/>
//       <ScrollToTop />
//       <Whatsapp />
//       <Footer />

//     </>
//   );
// }