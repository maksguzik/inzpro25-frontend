import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Doughnut } from "react-chartjs-2";
import { useAuth0 } from "@auth0/auth0-react";
import "./DeviceReliability.css";
import { useParams } from "react-router-dom";

const DeviceReliability = ({ deviceId: deviceIdFromProps }) => {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [reliabilityValue, setReliabilityValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { deviceId: deviceIdFromParams } = useParams();
  
  const deviceId = deviceIdFromProps || deviceIdFromParams;

  const {getAccessTokenSilently} = useAuth0();

  const formatDateToISO = (date) => {
    return date.toISOString();
  };

  const fetchReliabilityReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getAccessTokenSilently();

      const start = formatDateToISO(startDate);
      const end = formatDateToISO(endDate);

      const response = await fetch(
        `http://localhost:8080/alert/device-states/${deviceId}/reliability-report?start=${start}&end=${end}`,
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

      const responseData = await response.json();
      setReliabilityValue(responseData.reliabilityValue);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    fetchReliabilityReport();
    }, [deviceId]);
    

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
      <h2 className="relaliabily-h2">
          Device reliability{""}
          {reliabilityValue !== null && `: ${reliabilityValue.toFixed(2)}%`}
        </h2>
        <div>
          <label><strong>Start Date:</strong></label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm:ss"
            className="date-picker"
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
            className="date-picker"
          />
        </div>
        <button className="crudButton greyButton paginationButton" onClick={fetchReliabilityReport}>
          Get Report
        </button>
      </div>
      
      {reliabilityValue !== null && (
        <div className="chart-date">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default DeviceReliability;