import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams } from "react-router-dom";
import "./DeviceSummary.css";
import DeviceStatus from "./DeviceSummaryComponents/DeviceStatus";
import DeviceReliability from "./DeviceSummaryComponents/DeviceReliability";
import DeviceDowntimeInterface from "./DeviceSummaryComponents/DeviceDowntimeInterface";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { deviceId: deviceIdFromParams } = useParams();
  const [inputValue, setInputValue] = useState(""); 
  const [deviceId, setDeviceId] = useState(""); 
  const [deviceState, setDeviceState] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const { getAccessTokenSilently } = useAuth0();

  const fetchDeviceState = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `http://localhost:8080/alert/device-states/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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


  useEffect(() => {
    if (deviceIdFromParams) {
      setDeviceId(deviceIdFromParams);
      fetchDeviceState(deviceIdFromParams);
    }
  }, [deviceIdFromParams]);

 
  const handleSearch = () => {
    if (inputValue.trim() === "") {
      setError("Device ID cannot be empty!");
      return;
    }
    setDeviceId(inputValue); 
    fetchDeviceState(inputValue); 
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
          placeholder="Enter Device ID"
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyPress={handleKeyPress} 
          className="input-field"
        />
        <button
          onClick={handleSearch} 
          className="crudButton greyButton paginationButton"
        >
          Search
        </button>
      </div>

      {loading && <div className="loading">Loading data...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <>
          <div className="details-container">
            {deviceState && <DeviceStatus deviceState={deviceState} deviceId={deviceId} />}
            {deviceState && <DeviceReliability deviceId={deviceId} />}
          </div>

          {deviceState && <DeviceDowntimeInterface deviceId={deviceId} />}
        </>
      )}
    </div>
  );
}

export default DeviceSummary;