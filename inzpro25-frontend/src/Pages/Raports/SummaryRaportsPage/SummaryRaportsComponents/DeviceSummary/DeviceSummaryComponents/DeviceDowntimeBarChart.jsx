import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth0 } from "@auth0/auth0-react";
import "./DeviceDowntimeBarChart.css";
import { useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DeviceDowntimeBarChart = ({ deviceId: deviceIdFromProps }) => {
  const [downtimeData, setDowntimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("year");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [startMonthIndex, setStartMonthIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { getAccessTokenSilently } = useAuth0();
  const { deviceId: deviceIdFromParams } = useParams();

  const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

  const deviceId = deviceIdFromProps || deviceIdFromParams;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [2024, 2025];

  const viewModes = [
    { value: "year", label: "Whole Year" },
    { value: "month", label: "Single Month" },
    { value: "threeMonths", label: "Three Months" },
  ];

  const today = new Date();

  const fetchDowntimeData = async () => {
    if (!deviceId) {
      console.error("Device ID is missing");
      return;
    }

    let daysBack;
    if (viewMode === "year") {
      daysBack = 365;
    } else if (viewMode === "month") {
      const firstDayOfSelectedMonth = new Date(
        selectedYear,
        months.indexOf(selectedMonth),
        1
      );
      daysBack = Math.ceil((today - firstDayOfSelectedMonth) / (1000 * 60 * 60 * 24));
    } else if (viewMode === "threeMonths") {
      const startDate = new Date(selectedYear, startMonthIndex, 1);
      daysBack = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
    }

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        URL + `alert/device-states/${deviceId}/downtimes?days=${daysBack}`,
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
      console.log(data)
      setDowntimeData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching downtime data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDowntimeData();
  }, [deviceId, viewMode, selectedYear, selectedMonth, startMonthIndex]);

  const processData = () => {
    const downtimeDays = new Array(12).fill(0);
    const activeDays = new Array(12).fill(0);
  
    const downtimeDaysSet = new Set();
  
    downtimeData.forEach((downtime) => {
      const startDate = new Date(downtime.started);
      const endDate = downtime.ended ? new Date(downtime.ended) : new Date();
  
      for (
        let currentDate = new Date(startDate);
        currentDate <= endDate;
        currentDate.setUTCDate(currentDate.getUTCDate() + 1)
      ) {
        const year = currentDate.getUTCFullYear();
        const monthIndex = currentDate.getUTCMonth();
        const day = currentDate.getUTCDate();
  
        if (year === selectedYear) {
          const uniqueDayKey = `${year}-${monthIndex}-${day}`;
          downtimeDaysSet.add(uniqueDayKey);
        }
      }
    });
  
    downtimeDaysSet.forEach((uniqueDayKey) => {
      const [year, monthIndex] = uniqueDayKey.split("-").map(Number);
      downtimeDays[monthIndex] += 1;
    });
  
    const today = new Date();
    activeDays.forEach((_, index) => {
      const daysInMonth = new Date(selectedYear, index + 1, 0).getDate();
  
      if (selectedYear === today.getFullYear() && index === today.getMonth()) {
        activeDays[index] = today.getDate() - downtimeDays[index];
      } else if (selectedYear < today.getFullYear() || index < today.getMonth()) {
        activeDays[index] = daysInMonth - downtimeDays[index];
      } else {
        activeDays[index] = 0;
      }
    });
  
    if (viewMode === "year") {
      return {
        filteredMonths: months,
        filteredDowntimeDays: downtimeDays,
        filteredActiveDays: activeDays,
      };
    } else if (viewMode === "month") {
      const monthIndex = months.indexOf(selectedMonth);
      return {
        filteredMonths: [selectedMonth],
        filteredDowntimeDays: [downtimeDays[monthIndex]],
        filteredActiveDays: [activeDays[monthIndex]],
      };
    } else if (viewMode === "threeMonths") {
      const filteredMonths = months.slice(startMonthIndex, startMonthIndex + 3);
      const filteredDowntimeDays = downtimeDays.slice(
        startMonthIndex,
        startMonthIndex + 3
      );
      const filteredActiveDays = activeDays.slice(
        startMonthIndex,
        startMonthIndex + 3
      );
      return { filteredMonths, filteredDowntimeDays, filteredActiveDays };
    }
  };
  

  const { filteredMonths, filteredDowntimeDays, filteredActiveDays } = processData();

  const data = {
    labels: filteredMonths,
    datasets: [
      {
        label: "Downtime Days",
        data: filteredDowntimeDays,
        backgroundColor: "#ff4d4f",
      },
      {
        label: "Active Days",
        data: filteredActiveDays,
        backgroundColor: "#4caf50",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Months" } },
      y: { title: { display: true, text: "Number of Days" }, beginAtZero: true },
    },
  };

  return (
    <div className="bar-chart-container">
      <div className="controls">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
          {viewModes.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>

        {viewMode === "month" && (
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        )}

        {viewMode === "threeMonths" && (
          <>
            <button onClick={() => setStartMonthIndex(startMonthIndex - 1)} disabled={startMonthIndex === 0}>
              Previous
            </button>
            <button
              onClick={() => setStartMonthIndex(startMonthIndex + 1)}
              disabled={startMonthIndex + 3 >= months.length}
            >
              Next
            </button>
          </>
        )}
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DeviceDowntimeBarChart;