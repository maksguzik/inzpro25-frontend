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

import "./DeviceDowntimeBarChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DeviceDowntimeBarChart = () => {
  const [downtimeData, setDowntimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("year"); 
  const [selectedMonth, setSelectedMonth] = useState("January"); 
  const [startMonthIndex, setStartMonthIndex] = useState(0); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 

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


  const fetchDowntimeData = async () => {
    try {
      const response = await fetch("http://localhost:8080/alert/device-states/1/downtimes?days=365");

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
  }, []);


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
      
      return { filteredMonths: months, filteredDowntimeDays: downtimeDays, filteredActiveDays: activeDays };
    } else if (viewMode === "month") {
     
      const monthIndex = months.indexOf(selectedMonth);
      return {
        filteredMonths: [selectedMonth],
        filteredDowntimeDays: [downtimeDays[monthIndex]],
        filteredActiveDays: [activeDays[monthIndex]],
      };
    } else if (viewMode === "threeMonths") {
      
      const filteredMonths = months.slice(startMonthIndex, startMonthIndex + 3);
      const filteredDowntimeDays = downtimeDays.slice(startMonthIndex, startMonthIndex + 3);
      const filteredActiveDays = activeDays.slice(startMonthIndex, startMonthIndex + 3);
      return { filteredMonths, filteredDowntimeDays, filteredActiveDays };
    }
  };


  const handlePrevious = () => {
    if (startMonthIndex > 0) {
      setStartMonthIndex(startMonthIndex - 1);
    }
  };

  const handleNext = () => {
    if (startMonthIndex < months.length - 3) {
      setStartMonthIndex(startMonthIndex + 1);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: `Downtime and Active Days (${viewMode === "year" ? "Yearly" : viewMode === "month" ? `for ${selectedMonth}` : "for Selected 3 Months"}) for ${selectedYear}`,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Months",
        },
      },
      y: {
        title: {
          display: false,
          text: "Number of Days",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <div className="controls">

        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label>
          <input
            type="radio"
            value="year"
            checked={viewMode === "year"}
            onChange={() => setViewMode("year")}
          />
          Whole Year
        </label>
        <label>
          <input
            type="radio"
            value="month"
            checked={viewMode === "month"}
            onChange={() => setViewMode("month")}
          />
          Single Month
        </label>
        <label>
          <input
            type="radio"
            value="threeMonths"
            checked={viewMode === "threeMonths"}
            onChange={() => setViewMode("threeMonths")}
          />
          Three Months
        </label>

        {viewMode === "month" && (
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        )}

        {viewMode === "threeMonths" && (
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={startMonthIndex === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={startMonthIndex >= months.length - 3}>
              Next
            </button>
          </div>
        )}
      </div>

      <Bar data={data} options={options} />
    </div>
  );
};

export default DeviceDowntimeBarChart;