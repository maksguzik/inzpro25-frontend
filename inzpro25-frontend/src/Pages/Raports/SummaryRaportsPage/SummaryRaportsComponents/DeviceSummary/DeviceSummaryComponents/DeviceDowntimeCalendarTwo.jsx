import React, { useEffect, useState } from "react";
import "./DeviceDowntimeCalendarTwo.css";

const DeviceDowntimeCalendarTwo = ({ month, year, downtimes }) => {
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    generateDaysInMonth();
  }, [month, year]);


  const generateDaysInMonth = () => {
    const totalDays = new Date(year, month + 1, 0).getDate(); 
    const startDay = new Date(year, month, 1).getDay(); 
    const days = Array.from({ length: totalDays }, (_, index) => ({
      day: index + 1,
      status: getDayStatus(year, month, index + 1),
    }));
    setDaysInMonth({ startDay, days });
  };


  const getDayStatus = (year, month, day) => {
    const date = new Date(year, month, day).toISOString().split("T")[0];
    const downtime = downtimes.find((d) => d.started.split("T")[0] === date);
    return downtime ? "downtime" : "active";
  };

  return (
    <>
    <div className="month-grid-container">
      <div className="month-header">
        <h3>{new Date(year, month).toLocaleString("en-US", { month: "long" })} {year}</h3>
        <span>96%</span>
      </div>
      <div className="grid">
        {/* Puste miejsca dla pierwszego dnia miesiąca */}
        {Array.from({ length: daysInMonth.startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="day empty"></div>
        ))}
        {/* Kwadraty dni */}
        {daysInMonth.days &&
          daysInMonth.days.map((day) => (
            <div
              key={day.day}
              className={`day ${day.status === "downtime" ? "downtime" : "active"}`}
              title={`Day ${day.day}`}
            ></div>
          ))}
      </div>
    </div>
    </>
  );
};

export default DeviceDowntimeCalendarTwo;