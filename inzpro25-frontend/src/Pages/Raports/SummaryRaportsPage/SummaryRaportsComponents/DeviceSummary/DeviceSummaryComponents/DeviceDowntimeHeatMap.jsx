import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./DeviceDowntimeHeatMap.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const DeviceDowntimeHeatMap = ({ deviceId: deviceIdFromProps }) => {
  const [downtimes, setDowntimes] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { deviceId: deviceIdFromParams } = useParams();

  const deviceId = deviceIdFromProps || deviceIdFromParams;

  const fetchDowntimes = async () => {
    const token = await getAccessTokenSilently();
    if (!deviceId) {
      console.error("Device ID is missing");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/alert/device-states/${deviceId}/downtimes?days=365`,
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
      setDowntimes(data);
    } catch (error) {
      console.error("Error fetching downtimes:", error);
    }
  };

  const expandDowntimePeriods = (downtimes) => {
    const expandedDates = [];
    downtimes.forEach((downtime) => {
      const startDate = new Date(downtime.started.split("T")[0]);
      const endDate = downtime.ended
        ? new Date(downtime.ended.split("T")[0])
        : new Date();
      let currentDate = startDate;

      while (currentDate <= endDate) {
        expandedDates.push({
          date: currentDate.toISOString().split("T")[0],
          count: downtime.active ? 1 : 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return expandedDates;
  };

  const mappedData = expandDowntimePeriods(downtimes);

  useEffect(() => {
    fetchDowntimes();
  }, [deviceId]);

  return (
    <div>
      <div className="calendar-container">
        <CalendarHeatmap
          startDate={new Date("2025-01-01")}
          endDate={new Date("2025-12-31")}
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
