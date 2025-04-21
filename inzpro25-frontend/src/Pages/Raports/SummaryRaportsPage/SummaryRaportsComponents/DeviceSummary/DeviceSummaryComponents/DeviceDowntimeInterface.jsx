import React, { useState } from "react";
import DeviceDowntimeHeatMap from "./DeviceDowntimeHeatMap";
import DeviceDowntimeBarChart from "./DeviceDowntimeBarChart";

const DeviceDowntimeInterface = ({ deviceId}) => {
  const [selectedChart, setSelectedChart] = useState("barchart"); 

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "heatmap":
        return <DeviceDowntimeHeatMap deviceId={deviceId}/>;
      case "barchart":
        return <DeviceDowntimeBarChart deviceId={deviceId}/>;
      // case "grid":
      //   return <DeviceDowntimeCalendarTwo month={0} year={2025} downtimes={downtimes} />;
      default:
        return <DeviceDowntimeBarChart deviceId={deviceId}/>;
    }
  };

  return (
    <div>
      <h3 style={{ marginRight: "8px", marginTop: "0px" }}>Device downtime days</h3>
      <div>
        <button style={{ marginRight: "8px" }} className="crudButton greyButton paginationButton" onClick={() => setSelectedChart("barchart")}>Bar Chart</button>
        <button style={{ marginRight: "8px", marginTop: "5px" }} className="crudButton greyButton paginationButton" onClick={() => setSelectedChart("heatmap")}>Heatmap</button>
      </div>
      {renderSelectedChart()}
    </div>
  );
};

export default DeviceDowntimeInterface;