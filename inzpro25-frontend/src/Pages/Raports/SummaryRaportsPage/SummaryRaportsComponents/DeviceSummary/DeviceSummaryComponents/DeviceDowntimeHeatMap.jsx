import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./DeviceDowntimeHeatMap.css";

const DeviceDowntimeHeatMap = () => {
  const [downtimes, setDowntimes] = useState([]);


  const fetchDowntimes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/alert/device-states/1/downtimes?days=365"
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

 
  const mappedData = downtimes.map((downtime) => {
    return {
      date: downtime.started.split("T")[0], 
      count: downtime.active ? 1 : 0, 
    };
  });

  useEffect(() => {
    fetchDowntimes();
  }, []);

  return (
    <div>
      <div className="calendar-container">
        <CalendarHeatmap
          startDate={new Date("2024-01-01")}
          endDate={new Date("2024-12-31")}
          values={mappedData}
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return "color-empty";
            }
            return "color-downtime";
          }}
          showWeekdayLabels={true}
        />
      </div>
    </div>
  );
};

export default DeviceDowntimeHeatMap;
