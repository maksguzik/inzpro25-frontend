import React, { useEffect, useState } from "react";
import "./DeviceDowntimeCalendarTwo.css";
import { useAuth0 } from "@auth0/auth0-react";

const DeviceDowntimeCalendarTwo = ({ month, year, downtimes }) => {
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    generateDaysInMonth();
  }, [month, year]);

  const generateDaysInMonth = () => {
    const totalDays = new Date(year, month + 1, 0).getDate(); 
    const startDay = new Date(year, month, 1).getDay(); 
    const days = Array.from({ length: totalDays }, (_, index) => {
      const currentDay = new Date(year, month, index + 1);
      return {
        day: index + 1,
        dayOfWeek: currentDay.getDay(),
        status: getDayStatus(year, month, index + 1),
      };
    });
    setDaysInMonth({ startDay, days });
  };

  const getDayStatus = (year, month, day) => {
    const date = new Date(year, month, day).toISOString().split("T")[0];
    const downtime = downtimes.find((d) => d.started.split("T")[0] === date);
    return downtime ? "downtime" : "active";
  };

  return (
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
              className={`day ${day.status} ${
                day.dayOfWeek === 6 ? "saturday" : day.dayOfWeek === 0 ? "sunday" : ""
              }`}
              title={`Day ${day.day}`}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default DeviceDowntimeCalendarTwo;