import React, { useState, useEffect, useMemo } from "react";
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
      console.error("Brakuje identyfikatora urządzenia (Device ID)");
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
        throw new Error(`Błąd HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data)
      setDowntimes(data);
    } catch (error) {
    }
  };


  const expandDowntimePeriods = (downtimes) => {
    const expandedDates = [];
    downtimes.forEach((downtime) => {

        const startDate = new Date(downtime.started.split("T")[0] + "T00:00:00Z"); 
        const endDate = downtime.ended
            ? new Date(downtime.ended.split("T")[0] + "T00:00:00Z") 
            : new Date(new Date().toISOString().split("T")[0] + "T00:00:00Z"); 

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            expandedDates.push({
                date: currentDate.toISOString().split("T")[0], 
                count: downtime.active ? 1 : 0,
            });
            currentDate.setUTCDate(currentDate.getUTCDate() + 1); 
        }
    });

    return expandedDates;
};

  const mappedData = useMemo(() => expandDowntimePeriods(downtimes), [downtimes]);

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