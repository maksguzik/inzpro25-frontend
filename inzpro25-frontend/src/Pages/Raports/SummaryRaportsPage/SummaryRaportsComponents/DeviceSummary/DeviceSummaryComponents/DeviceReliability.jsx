import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Doughnut } from "react-chartjs-2";

const DeviceReliability = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reliabilityValue, setReliabilityValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDateToISO = (date) => {
    return date.toISOString();
  };

  const fetchReliabilityReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const start = formatDateToISO(startDate);
      const end = formatDateToISO(endDate);

      const response = await fetch(
        `http://localhost:8080/alert/device-states/1/reliability-report?start=${start}&end=${end}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setReliabilityValue(responseData.reliabilityValue);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ["Reliability", "Remaining"],
    datasets: [
      {
        data: [reliabilityValue || 0, 100 - (reliabilityValue || 0)],
        backgroundColor: ["#4CAF50", "#D3D3D3"],
        hoverBackgroundColor: ["#45A049", "#C0C0C0"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="container-date">
      <div className="controls-date">
      <h2>
          Device reliability{""}
          {reliabilityValue !== null && `: ${reliabilityValue.toFixed(2)}%`}
        </h2>
        <div>
          <label><strong>Start Date: </strong></label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm:ss"
          />
        </div>
        <div>
          <label><strong>End Date: </strong></label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm:ss"
          />
        </div>
        <button className="button-reliability" onClick={fetchReliabilityReport}>
          Get Report
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {reliabilityValue !== null && (
        <div className="chart-date">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default DeviceReliability;