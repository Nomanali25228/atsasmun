import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import mien from "@/app/public/videos/mien.mp4";
import video1 from "@/app/public/videos/one.mp4";
import video2 from "@/app/public/videos/two.mp4";
import video3 from "@/app/public/videos/three.mp4";

import tumnail1 from "@/app/public/img/tumhail1 (1).webp";
import tumnail2 from "@/app/public/img/tumhail1 (2).webp";
import tumnail3 from "@/app/public/img/tumhail1 (3).webp";

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(mien);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoSectionRef = useRef(null);

  const videos = [
    {
      id: 1,
      src: video1,
      thumbnail: tumnail1.src,
    },
    {
      id: 2,
      src: video2,
      thumbnail: tumnail2.src,
    },
    {
      id: 3,
      src: video3,
      thumbnail: tumnail3.src,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVideoVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    const currentRef = videoSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={videoSectionRef}
      className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-4 sm:px-6 md:px-10 lg:px-16"
    >
      {/* Title Section */}
      <div data-aos="fade-up" className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-700 tracking-wide">
          VIDEOS
        </h2>
        <p className="text-gray-500 text-base sm:text-lg mt-2">
          Have a feel for Istanbul International MUN
        </p>
        <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
      </div>

      {/* Video Gallery */}
<div className="flex  justify-center">

      <div className="flex flex-col   lg:flex-row max-w-7xl ">
        {/* Thumbnails */}
        <div
          data-aos="fade-right"
          className="flex flex-wrap  lg:flex-col gap-4 justify-center items-center lg:items-start"
          >
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video.src)}
              className={`group relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-500 hover:scale-105 ${
                selectedVideo === video.src ? "ring-4 ring-blue-500" : ""
              }`}
              aria-label={`Select video ${video.id}`}
            >
              <Image
                src={video.thumbnail}
                alt={`Thumbnail for video ${video.id}`}
                width={160}
                height={90}
                className="w-32 sm:w-40 h-20 sm:h-24 md:w-48 md:h-28 lg:w-52 lg:h-36 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Main Video Display */}
              {/* Main Video Display */}
              <div data-aos="fade-up" className="flex-1 mt-6 lg:mt-0 lg:ml-10">
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video w-[85%] sm:w-[70%] md:w-[60%] lg:w-[84%] mx-auto lg:mx-0">
            {/* Animated Border */}
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 rounded-2xl transition-all duration-500"></div>
            {/* Video */}
            <video
              src={selectedVideo}
              controls
              autoPlay={isVideoVisible}
              muted
              aria-label="Main video player"
              className="w-full h-full object-cover"
            ></video>
          </div>
        </div>

      </div>
            </div>
    </section>
  );
}
