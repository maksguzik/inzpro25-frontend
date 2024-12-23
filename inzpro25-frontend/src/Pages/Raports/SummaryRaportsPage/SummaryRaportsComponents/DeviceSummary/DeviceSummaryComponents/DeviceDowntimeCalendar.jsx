import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DeviceDowntimeCalendar.css";

const DeviceDowntimeCalendar = () => {
  const [downtimes, setDowntimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Funkcja do pobierania danych z API
  const fetchDowntimes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/alert/device-states/1/downtimes?days=90"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDowntimes(data);
    } catch (error) {
      console.error("Error fetching downtimes:", error);
    }
  };

  useEffect(() => {
    fetchDowntimes();
  }, []);

  // Sprawdza, czy dzień jest nieaktywny
  const isDowntime = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
    return downtimes.some(
      (downtime) =>
        downtime.started.split("T")[0] === formattedDate && downtime.active
    );
  };

  // Funkcja renderująca styl dla poszczególnych dni
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (isDowntime(date)) {
        return "downtime-day"; // Klasa dla dni nieaktywnych
      }
      return "active-day"; // Klasa dla dni aktywnych
    }
  };

  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName} // Ustawia styl dla dni
        locale="en-US"
      />
      <div className="details">
        <h3>Details for {selectedDate.toDateString()}</h3>
        {isDowntime(selectedDate) ? (
          <p style={{ color: "red" }}>Device was inactive this day.</p>
        ) : (
          <p style={{ color: "green" }}>Device was active this day.</p>
        )}
      </div>
    </div>
  );
};

export default DeviceDowntimeCalendar;