import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./DeviceSummary.css";
import DeviceStatus from "./DeviceSummaryComponents/DeviceStatus";
import DeviceReliability from "./DeviceSummaryComponents/DeviceReliability";
import DeviceDowntimeHeatMap from "./DeviceSummaryComponents/DeviceDowntimeHeatMap";
import DeviceDowntimeInterface from "./DeviceSummaryComponents/DeviceDowntimeInterface";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

function DeviceSummary() {
  const [deviceId, setDeviceId] = useState(""); 
  const [deviceState, setDeviceState] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const fetchDeviceState = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8080/alert/device-states/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDeviceState(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (deviceId.trim() === "") {
      setError("Device ID nie może być puste!");
      return;
    }
    fetchDeviceState(deviceId);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="deviceSummaryContainer">
      <div className="input-container">
        <input
          type="text"
          placeholder="Wpisz Device ID"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-field"
        />
        <button onClick={handleSearch} className="button">
          Search
        </button>
      </div>

      {loading && <div className="loading">Ładowanie danych...</div>}
      {error && <div className="error">Error: {error}</div>}
      <div className="details-container">
        {deviceState && <DeviceStatus deviceState={deviceState} />}
        {deviceState && <DeviceReliability />}
      </div>
      {deviceState && <DeviceDowntimeInterface />}
    </div>
  );
}

export default DeviceSummary;
