import React, { useState } from "react";
import DeviceDowntimeHeatMap from "./DeviceDowntimeHeatMap";
import DeviceDowntimeCalendar from "./DeviceDowntimeCalendar";
import DeviceDowntimeCalendarTwo from "./DeviceDowntimeCalendarTwo";
import DeviceDowntimeBarChart from "./DeviceDowntimeBarChart";

const DeviceDowntimeInterface = () => {
  const [selectedChart, setSelectedChart] = useState("heatmap"); 
  const downtimes = [
    { started: "2024-12-24T00:00:00Z" },
  ];

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "heatmap":
        return <DeviceDowntimeHeatMap />;
      case "barchart":
        return <DeviceDowntimeBarChart />;
      case "grid":
        return <DeviceDowntimeCalendarTwo month={11} year={2024} downtimes={downtimes} />;
      default:
        return <DeviceDowntimeHeatMap />;
    }
  };

  return (
    <div>
      <h2>Device Downtime Interface</h2>
      <div style={{ marginBottom: "20px" }}>
        <button className="button" onClick={() => setSelectedChart("heatmap")}>Heatmap</button>
        <button className="button" onClick={() => setSelectedChart("barchart")}>Bar Chart</button>
        <button className="button" onClick={() => setSelectedChart("grid")}>Calendar</button>
      </div>

      {renderSelectedChart()}
    </div>
  );
};

export default DeviceDowntimeInterface;