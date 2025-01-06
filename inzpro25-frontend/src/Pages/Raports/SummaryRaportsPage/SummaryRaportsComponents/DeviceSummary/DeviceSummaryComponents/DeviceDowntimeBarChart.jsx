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

  const years = [2023, 2024, 2025];

  const viewModes = [
    { value: "year", label: "Whole Year" },
    { value: "month", label: "Single Month" },
    { value: "threeMonths", label: "Three Months" },
  ];

  let daysBack;
  const today = new Date();

  const fetchDowntimeData = async () => {
    if (!deviceId) {
      console.error("Device ID is missing");
      return;
    }

    if (viewMode === "year") {
      daysBack = 365;
    } else if (viewMode === "month") {
      const firstDayOfSelectedMonth = new Date(
        selectedYear,
        months.indexOf(selectedMonth),
        1
      );
      const diffInTime = today - firstDayOfSelectedMonth;
      daysBack = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
    } else if (viewMode === "threeMonths") {
      const startMonth = startMonthIndex;
      const endMonth = startMonth + 3;
      const startDate = new Date(selectedYear, startMonth, 1);
      const endDate = new Date(selectedYear, endMonth, 0);
      daysBack = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));

      if (startDate > today) {
        daysBack = 0;
      }
    }

    const token = await getAccessTokenSilently();
    try {
      const response = await fetch(
        `http://localhost:8080/alert/device-states/${deviceId}/downtimes?days=${daysBack}`,
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

    downtimeData.forEach((downtime) => {
      const date = new Date(downtime.started);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      if (year === selectedYear) {
        downtimeDays[monthIndex] += 1;
      }
    });

    activeDays.forEach((_, index) => {
      const daysInMonth = new Date(selectedYear, index + 1, 0).getDate();
      activeDays[index] = daysInMonth - downtimeDays[index];
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

  const handlePrevious = () => {
    if (startMonthIndex > 0) {
      setStartMonthIndex(startMonthIndex - 1);
    }
  };

  const handleNext = () => {
    if (startMonthIndex + 3 < months.length) {
      setStartMonthIndex(startMonthIndex + 1);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { filteredMonths, filteredDowntimeDays, filteredActiveDays } =
    processData();

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
      legend: {
        position: "top",
      },
    },
    scales: {
      x: { title: { display: false, text: "Months" } },
      y: {
        title: { display: false, text: "Number of Days" },
        beginAtZero: false,
      },
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
            <button onClick={handlePrevious} disabled={startMonthIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
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
