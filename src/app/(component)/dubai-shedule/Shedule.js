"use client";
import React, { useState } from "react";

export default function Shedule(props) {
if  (props.timeing=="Istanbul, Turkey") {
  var schedules = {
    day1: [
      { time: "02:00 pm - 03:00 pm", activity: "Arrival and Registrations" },
  { time: "03:00 pm - 04:00 pm", activity: "Check-In" },
  { time: "05:00 pm - 06:00 pm", activity: "Preparation Opening Ceremony" },
  { time: "06:00 pm - 07:00 pm", activity: "Opening Ceremony" },
  { time: "07:00 pm - 08:00 pm", activity: "Opening Dinner" },
  { time: "08:00 pm - 09:00 pm", activity: "Scavenger Hunt" },
  { time: "09:00 pm - 10:00 pm", activity: "Ice Breaking – First Committee Session" },
  { time: "10:00 pm - Onwards", activity: "Free Night" }
    ],
    day2: [
      { time: "06:00 am - 08:00 am", activity: "Breakfast" },
  { time: "08:00 am - 09:00 am", activity: "Committee Session Preparation" },
  { time: "09:00 am - 11:00 am", activity: "Committee Session 2" },
  { time: "11:00 am - 11:30 am", activity: "Break" },
  { time: "11:30 am - 01:30 pm", activity: "Committee Session 3" },
  { time: "01:30 pm - 03:00 pm", activity: "Lunch" },
  { time: "03:00 pm - 04:30 pm", activity: "Committee Session 4" },
  { time: "04:30 pm - 04:45 pm", activity: "Break" },
  { time: "04:45 pm - 05:30 pm", activity: "Crisis Session" },
  { time: "05:30 pm - 06:15 pm", activity: "Preparation for Cultural Global Village" },
  { time: "06:30 pm - 07:30 pm", activity: "Awarding Ceremony" },
  { time: "07:30 pm - 08:15 pm", activity: "Dinner" },
  { time: "08:15 pm - 11:00 pm", activity: "Cultural Global Village" },

    ],
    day3: [
      { time: "06:00 AM - 08:00 AM", activity: "Breakfast" },
      { time: "08:00 AM - 09:00 AM", activity: "Lobby for City Tour" },
      { time: "09:00 AM - 01:00 PM", activity: "Aya Sofia and Blue Mosque" },
      { time: "01:00 PM - 03:00 PM", activity: "Rooftop Lunch" },
      { time: "03:00 PM - 06:00 PM", activity: "Taksim Square and Galata Tower" },
      { time: "06:00 PM - 11:00 PM", activity: "Bosphorus Cruise Dinner" },
      { time: "11:00 PM - Onwards", activity: "Back to Hotel" }
    ],
    day4: [
      { time: "06:00 AM - 09:00 AM", activity: "Breakfast" },
  { time: "12:00 PM - Onwards", activity: "Check-Out" }
    ],
  };
}
 
 else if (props.timeing=="Dubai, UAE") {
  var schedules = {
    day1: [
      { time: "02:00 pm - 03:00 pm", activity: "Arrival and Registrations" },
      { time: "03:00 pm - 04:00 pm", activity: "Check-In" },
      { time: "05:00 pm - 06:00 pm", activity: "Preparation Opening Ceremony" },
      { time: "06:00 pm - 07:00 pm", activity: "Opening Ceremony" },
      { time: "07:00 pm - 08:00 pm", activity: "Opening Dinner" },
      { time: "08:00 pm - 09:00 pm", activity: "Scavenger Hunt" },
      { time: "09:00 pm - 10:00 pm", activity: "Ice Breaking – First Committee Session" },
      { time: "10:00 pm - Onwards", activity: "Free Night" },
    ],
    day2: [
      { time: "06:00 am - 08:00 am", activity: "Breakfast" },
      { time: "08:00 am - 09:00 am", activity: "Committee Session Preparation" },
      { time: "09:00 am - 11:00 am", activity: "Committee Session 2" },
      { time: "11:00 am - 11:30 am", activity: "Break" },
      { time: "11:30 am - 01:30 pm", activity: "Committee Session 3" },
      { time: "01:30 pm - 03:00 pm", activity: "Lunch" },
      { time: "03:00 pm - 04:30 pm", activity: "Committee Session 4" },
      { time: "04:30 pm - 04:45 pm", activity: "Break" },
      { time: "04:45 pm - 05:30 pm", activity: "Crisis Session" },
      { time: "05:30 pm - 06:15 pm", activity: "Preparation for Cultural Global Village" },
      { time: "06:30 pm - 07:30 pm", activity: "Awarding Ceremony" },
      { time: "07:30 pm - 08:15 pm", activity: "Dinner" },
      { time: "08:15 pm - 11:00 pm", activity: "Cultural Global Village" },
    ],
    day3: [
      { time: "06:00 am - 09:00 am", activity: "Breakfast" },
      { time: "08:00 am - 09:00 am", activity: "Lobby for City Tour" },
      { time: "01:00 pm - 01:30 pm", activity: "Lunch" },
      { time: "01:30 pm - 07:00 pm", activity: "Desert Safari" },
      { time: "07:00 pm - 10:00 pm", activity: "Dinner at Desert Camps" },
      { time: "10:00 pm - Onwards", activity: "Back to Hotel" },
    ],
    day4: [
      { time: "06:00 am - 09:00 am", activity: "Breakfast" },
      { time: "12:00 pm - Onwards", activity: "Check-Out" },
    ],
  };
}
else if (props.timeing=="Baku, Azerbaijan") {
 var schedules = {
  day1: [
    { time: "02:00 pm – 03:00 pm", activity: "Arrival and Registrations" },
    { time: "03:00 pm – 04:00 pm", activity: "Check-In" },
    { time: "05:00 pm – 06:00 pm", activity: "Preparation Opening Ceremony" },
    { time: "06:00 pm – 07:00 pm", activity: "Opening Ceremony" },
    { time: "07:00 pm – 08:00 pm", activity: "Opening Dinner" },
    { time: "08:00 pm – 09:00 pm", activity: "Scavenger Hunt" },
    { time: "09:00 pm – 10:00 pm", activity: "Ice Breaking – First Committee Session" },
    { time: "10:00 pm – Onwards", activity: "Free Night" },
  ],
  day2: [
    { time: "06:00 am – 08:00 am", activity: "Breakfast" },
    { time: "08:00 am – 09:00 am", activity: "Committee Session Preparation" },
    { time: "09:00 am – 11:00 am", activity: "Committee Session 2" },
    { time: "11:00 am – 11:30 am", activity: "Break" },
    { time: "11:30 am – 01:30 pm", activity: "Committee Session 3" },
    { time: "01:30 pm – 03:00 pm", activity: "Lunch" },
    { time: "03:00 pm – 04:30 pm", activity: "Committee Session 4" },
    { time: "04:30 pm – 04:45 pm", activity: "Break" },
    { time: "04:45 pm – 05:30 pm", activity: "Crisis Session" },
    { time: "05:30 pm – 06:15 pm", activity: "Preparation for Cultural Global Village" },
    { time: "06:30 pm – 07:30 pm", activity: "Awarding Ceremony" },
    { time: "07:30 pm – 08:15 pm", activity: "Dinner" },
    { time: "08:15 pm – 11:00 pm", activity: "Cultural Global Village" },
  ],
  day3: [
    { time: "06:00 am – 09:00 am", activity: "Breakfast" },
    { time: "09:00 am – 10:00 am", activity: "Lobby for City Tour" },
    { time: "10:00 am – 01:00 pm", activity: "City Tour" },
    { time: "01:00 pm – 02:00 pm", activity: "Lunch" },
    { time: "02:00 pm – 07:00 pm", activity: "City Tour Baku" },
    { time: "07:00 pm – 09:00 pm", activity: "Dinner" },
    { time: "09:00 pm – Onwards", activity: "Back to Hotel" },
  ],
  day4: [
    { time: "06:00 am – 09:00 am", activity: "Breakfast" },
    { time: "12:00 pm – Onwards", activity: "Check-Out" },
  ],
};

}
else if (props.timeing=="New York, USA") {
  var schedules = {
    day1: [
      { time: "02:00 pm - 03:00 pm", activity: "Arrival and Registrations" },
      { time: "03:00 pm - 04:00 pm", activity: "Check-In" },
      { time: "05:00 pm  06:00 pm", activity: "Preparation Opening Ceremony" },
      { time: "06:00 pm  07:00 pm", activity: "Opening Ceremony" },
      { time: "07:00 pm  08:00 pm", activity: "Opening Dinner" },
      { time: "08:00 pm  09:00 pm", activity: "Scavenger Hunt" },
      { time: "09:00 pm  10:00 pm", activity: "Ice Breaking – First Committee Session" },
      { time: "10:00 pm  Onwards", activity: "Free Night" }
    ],
    day2: [
      { time: "06:00 am  08:00 am", activity: "Breakfast" },
      { time: "08:00 am  09:00 am", activity: "Committee Session Preparation" },
      { time: "09:00 am  11:00 am", activity: "Committee Session 2" },
      { time: "11:00 am  11:30 am", activity: "Break" },
      { time: "11:30 am  01:30 pm", activity: "Committee Session 3" },
      { time: "01:30 pm  03:00 pm", activity: "Lunch" },
      { time: "03:00 pm  04:30 pm", activity: "Committee Session 4" },
      { time: "04:30 pm  04:45 pm", activity: "Break" },
      { time: "04:45 pm  05:30 pm", activity: "Crisis Session" },
      { time: "05:30 pm  06:15 pm", activity: "Preparation for Cultural Global Village" },
      { time: "06:30 pm  07:30 pm", activity: "Awarding Ceremony" },
      { time: "07:30 pm  08:15 pm", activity: "Dinner" },
      { time: "08:15 pm  11:00 pm", activity: "Cultural Global Village" }
    ],
    day3: [
      { time: "06:00 am  09:00 am", activity: "Breakfast" },
      { time: "09:00 am  10:00 am", activity: "Lobby for City Tour" },
      { time: "10:00 am  01:00 pm", activity: "City Tour" },
      { time: "01:00 pm  02:00 pm", activity: "Lunch" },
      { time: "02:00 pm  07:00 pm", activity: "New York City Tour" },
      { time: "07:00 pm  09:00 pm", activity: "Dinner" },
      { time: "09:00 pm  Onwards", activity: "Back to Hotel" }
    ],
    day4: [
      { time: "06:00 am  09:00 am", activity: "Breakfast" },
      { time: "12:00 pm  Onwards", activity: "Check-Out" }
    ]
  };
}
else if (props.timeing=="Riyadh, Saudi Arabia") {
  var schedules = {
    day1: [
      { time: "02:00 pm  03:00 pm", activity: "Arrival and Registrations" },
      { time: "03:00 pm  04:00 pm", activity: "Check-In" },
      { time: "05:00 pm  06:00 pm", activity: "Preparation Opening Ceremony" },
      { time: "06:00 pm  07:00 pm", activity: "Opening Ceremony" },
      { time: "07:00 pm  08:00 pm", activity: "Opening Dinner" },
      { time: "08:00 pm  09:00 pm", activity: "Scavenger Hunt" },
      { time: "09:00 pm  10:00 pm", activity: "Ice Breaking – First Committee Session" },
      { time: "10:00 pm  Onwards", activity: "Free Night" },
    ],
    day2: [
      { time: "06:00 am  08:00 am", activity: "Breakfast" },
      { time: "08:00 am  09:00 am", activity: "Committee Session Preparation" },
      { time: "09:00 am  11:00 am", activity: "Committee Session 2" },
      { time: "11:00 am  11:30 am", activity: "Break" },
      { time: "11:30 am  01:30 pm", activity: "Committee Session 3" },
      { time: "01:30 pm  03:00 pm", activity: "Lunch" },
      { time: "03:00 pm  04:30 pm", activity: "Committee Session 4" },
      { time: "04:30 pm  04:45 pm", activity: "Break" },
      { time: "04:45 pm  05:30 pm", activity: "Crisis Session" },
      { time: "05:30 pm  06:15 pm", activity: "Preparation for Cultural Global Village" },
      { time: "06:30 pm  07:30 pm", activity: "Awarding Ceremony" },
      { time: "07:30 pm  08:15 pm", activity: "Dinner" },
      { time: "08:15 pm  11:00 pm", activity: "Cultural Global Village" },
    ],
    day3: [
      { time: "06:00 am  09:00 am", activity: "Breakfast" },
      { time: "09:00 am  10:00 am", activity: "Lobby for City Tour" },
      { time: "10:00 am  01:00 pm", activity: "City Tour" },
      { time: "01:00 pm  02:00 pm", activity: "Lunch" },
      { time: "02:00 pm  07:00 pm", activity: "Riyadh City Tour" },
      { time: "07:00 pm  09:00 pm", activity: "Dinner" },
      { time: "09:00 pm  Onwards", activity: "Back to Hotel" },
    ],
    day4: [
      { time: "06:00 am  09:00 am", activity: "Breakfast" },
      { time: "12:00 pm  Onwards", activity: "Check-Out" },
    ],
  };
}
else if (props.timeing=="London, UK") {
  var schedules = {
    day1: [
      { time: "02:00 pm – 03:00 pm", activity: "Arrival and Registrations" },
      { time: "03:00 pm – 04:00 pm", activity: "Check-In" },
      { time: "05:00 pm – 06:00 pm", activity: "Preparation Opening Ceremony" },
      { time: "06:00 pm – 07:00 pm", activity: "Opening Ceremony" },
      { time: "07:00 pm – 08:00 pm", activity: "Opening Dinner" },
      { time: "08:00 pm – 09:00 pm", activity: "Scavenger Hunt" },
      { time: "09:00 pm – 10:00 pm", activity: "Ice Breaking – First Committee Session" },
      { time: "10:00 pm – Onwards", activity: "Free Night" },
    ],
    day2: [
      { time: "06:00 am – 08:00 am", activity: "Breakfast" },
      { time: "08:00 am – 09:00 am", activity: "Committee Session Preparation" },
      { time: "09:00 am – 11:00 am", activity: "Committee Session 2" },
      { time: "11:00 am – 11:30 am", activity: "Break" },
      { time: "11:30 am – 01:30 pm", activity: "Committee Session 3" },
      { time: "01:30 pm – 03:00 pm", activity: "Lunch" },
      { time: "03:00 pm – 04:30 pm", activity: "Committee Session 4" },
      { time: "04:30 pm – 04:45 pm", activity: "Break" },
      { time: "04:45 pm – 05:30 pm", activity: "Crisis Session" },
      { time: "05:30 pm – 06:15 pm", activity: "Preparation for Cultural Global Village" },
      { time: "06:30 pm – 07:30 pm", activity: "Awarding Ceremony" },
      { time: "07:30 pm – 08:15 pm", activity: "Dinner" },
      { time: "08:15 pm – 11:00 pm", activity: "Cultural Global Village" },
    ],
    day3: [
      { time: "06:00 am – 09:00 am", activity: "Breakfast" },
      { time: "09:00 am – 10:00 am", activity: "Lobby for City Tour" },
      { time: "10:00 am – 01:00 pm", activity: "City Tour" },
      { time: "01:00 pm – 02:00 pm", activity: "Lunch" },
      { time: "02:00 pm – 07:00 pm", activity: "London City Tour" },
      { time: "07:00 pm – 09:00 pm", activity: "Dinner" },
      { time: "09:00 pm – Onwards", activity: "Back to Hotel" },
    ],
    day4: [
      { time: "06:00 am – 09:00 am", activity: "Breakfast" },
      { time: "12:00 pm – Onwards", activity: "Check-Out" },
    ],
  
  };
}
 

//   02:00 pm – 03:00 pm			Arrival and Registrations
// 03:00 pm – 04:00 pm			Check-In
// 05:00 pm – 06:00 pm			Preparation Opening Ceremony
// 06:00 pm – 07:00 pm			Opening Ceremony
// 07:00 pm – 08:00 pm			Opening Dinner
// 08:00 pm – 09:00 pm			Scavenger Hunt
// 09:00 pm – 10:00 pm			Ice Breaking – First Committee Session
// 10:00 – Onwards				Free Night

  const [selectedDay, setSelectedDay] = useState("day1");

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6 py-10 sm:py-12">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Program Schedule
      </h2>
      <p className="text-gray-400 mb-6 text-center text-sm sm:text-base">
        Below is the breakdown of the event by days.
      </p>

      {/* Day Tabs */}
      <div className="flex flex-wrap justify-center space-x-0 sm:space-x-4 mb-6 gap-2">
        {Object.keys(schedules).map((day) => (
          <button
            key={day}
            className={`px-3 py-2 text-sm sm:text-lg font-medium rounded-md ${
              selectedDay === day
                ? "bg-gray-800 text-white underline"
                : "bg-gray-700 text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day.replace("day", "Day ")}
          </button>
        ))}
      </div>

      {/* Schedule Table */}
      <div className="w-full max-w-5xl border border-gray-700 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:flex bg-gray-800 text-sm sm:text-lg font-semibold p-3">
          <div className="w-1/2">Time</div>
          <div className="w-1/2">Activity</div>
        </div>

        {/* Table Content */}
        {schedules[selectedDay].map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row p-3 border-t border-gray-700 text-sm sm:text-base text-gray-300"
          >
            <div className="w-full sm:w-1/2 font-medium sm:font-normal">
              {item.time}
            </div>
            <div className="w-full sm:w-1/2">{item.activity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}