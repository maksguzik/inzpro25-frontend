import React, { useState } from "react";
import DeviceDowntimeHeatMap from "./DeviceDowntimeHeatMap";
import DeviceDowntimeCalendarTwo from "./DeviceDowntimeCalendarTwo";
import DeviceDowntimeBarChart from "./DeviceDowntimeBarChart";

const DeviceDowntimeInterface = ({ deviceId}) => {
  const [selectedChart, setSelectedChart] = useState("heatmap"); 
  const downtimes = [
    { started: "2025-01-01T00:00:00Z" },
  ];

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "heatmap":
        return <DeviceDowntimeHeatMap deviceId={deviceId}/>;
      case "barchart":
        return <DeviceDowntimeBarChart deviceId={deviceId}/>;
      case "grid":
        return <DeviceDowntimeCalendarTwo month={0} year={2025} downtimes={downtimes} />;
      default:
        return <DeviceDowntimeHeatMap deviceId={deviceId}/>;
    }
  };

  return (
    <div>
      <div>
        <button style={{ marginRight: "8px", marginTop: "5px" }} className="crudButton greyButton paginationButton" onClick={() => setSelectedChart("heatmap")}>Heatmap</button>
        <button style={{ marginRight: "8px" }} className="crudButton greyButton paginationButton" onClick={() => setSelectedChart("barchart")}>Bar Chart</button>
        <button className="crudButton greyButton paginationButton" onClick={() => setSelectedChart("grid")}>Calendar</button>
      </div>

      {renderSelectedChart()}
    </div>
  );
};

export default DeviceDowntimeInterface;