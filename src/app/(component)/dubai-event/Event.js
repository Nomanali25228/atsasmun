import React from "react";
import Image from "next/image"; // Import Next.js Image component
import hotelx2 from "@/app/public/img/hotelx2.webp";


export default function Event(props) {
  // Mock data for the events
  const events = [
    {      
      title: "Committee Sessions",
      image: props.img1,
    },
    {
      title: "Cultural Global Village",
      image: props.img2,
    },
    {
      title: "open Mic Night",
      image: props.img3,
    },
    {
      title: "Opening Ceremony",
      image: props.img4,
    },
    {
      title: "The Grand Closing Dinner",
      image: hotelx2,
    },
    {
      title: "Scavenger Hunt",
      image: props.img5,
    },
    
  ];


  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 text-blue-600 text-sm font-medium px-4 py-1 rounded-full inline-block">
            OUR KEY EVENTS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
            Series Of Events
          </h2>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 lg:h-64">
                <Image
                  src={event.image} // Imported image reference
                  alt={event.title}
                  layout="fill" // Ensures the image fills the container
                  objectFit="cover" // Maintains aspect ratio and covers the area
                  className="rounded-t-lg"
                />
                {/* Decorative Elements */}
              
             
              </div>
              {/* Title */}
              <div className="p-4 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                  {event.title}{" "}
                  <span className="text-gray-400 transition hover:text-gray-600">
                    ▼
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}