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
    <section style={{ background: '#12142B', padding: '72px 0', position: 'relative', zIndex: 1 }}>
      <div className="atsas-wrap">
        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 44 }}>
          <span className="atsas-eyebrow">Schedule</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              marginTop: 14,
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              color: '#F5F1E8',
            }}
          >
            Program Schedule
          </h2>
          <p style={{ color: 'rgba(245,241,232,0.62)', marginTop: 10, fontSize: 15, fontFamily: "'Work Sans', sans-serif" }}>
            Below is the breakdown of the event by days.
          </p>
        </div>

        {/* Day Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {Object.keys(schedules).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: '8px 20px',
                borderRadius: 100,
                border: '1.5px solid',
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all .2s ease',
                background: selectedDay === day ? '#FF5A5F' : 'transparent',
                borderColor: selectedDay === day ? '#FF5A5F' : 'rgba(245,241,232,0.25)',
                color: selectedDay === day ? '#12142B' : 'rgba(245,241,232,0.62)',
                fontWeight: selectedDay === day ? 700 : 400,
              }}
            >
              {day.replace("day", "Day ")}
            </button>
          ))}
        </div>

        {/* Schedule Table */}
        <div
          style={{
            border: '1px solid rgba(245,241,232,0.14)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              background: '#1B1E3D',
              padding: '14px 20px',
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#F2B705',
            }}
          >
            <div>Time</div>
            <div>Activity</div>
          </div>

          {/* Table Rows */}
          {schedules[selectedDay].map((item, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                padding: '14px 20px',
                borderTop: '1px solid rgba(245,241,232,0.08)',
                background: index % 2 === 0 ? 'transparent' : 'rgba(27,30,61,0.4)',
                fontFamily: "'Work Sans', sans-serif",
                fontSize: 14,
              }}
            >
              <div style={{ color: '#F2B705', fontWeight: 500 }}>{item.time}</div>
              <div style={{ color: 'rgba(245,241,232,0.85)' }}>{item.activity}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}