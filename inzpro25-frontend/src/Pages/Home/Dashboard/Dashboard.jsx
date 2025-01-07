import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Doughnut, Bar } from "react-chartjs-2";
import "./Dashboard.css";

function Dashboard() {
  const { getAccessTokenSilently } = useAuth0();
  const [charts, setCharts] = useState(() => {
    const savedCharts = localStorage.getItem("charts");
    return savedCharts ? JSON.parse(savedCharts) : Array(6).fill(null);
  });
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState(null);
  const [chartType, setChartType] = useState("donut");
  const [deviceType, setDeviceType] = useState("All");

  const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

  const fetchCompanies = async (query = "") => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        URL + `api/companies?name=${query}&page=0&size=10&sortBy=id&order=asc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCompanies(data.content);
      setFilteredCompanies(data.content);
      if (data.content.length > 0) {
        setSelectedCompany(data.content[0].id);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchStats = async (deviceTypeOverride = deviceType) => {
    try {
      if (!selectedCompany) {
        console.error("No company selected.");
        return;
      }

      const token = await getAccessTokenSilently();

      const url =
        URL +
        `api/companies/${selectedCompany}/devices/stats${
          deviceTypeOverride.toLowerCase() !== "all"
            ? `?deviceType=${deviceTypeOverride}`
            : ""
        }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCompanies(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("charts", JSON.stringify(charts));
  }, [charts]);

  const openPopup = (index) => {
    setActiveDashboard(index);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setActiveDashboard(null);
    setChartType("donut");
    setDeviceType("All");
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChartTypeSelection = (type) => {
    setChartType(type);
  };

  const handleDeviceTypeChange = (event) => {
    setDeviceType(event.target.value);
  };

  const handleCreate = async () => {
    const statsData = await fetchStats();
    if (statsData) {
      const selectedCompanyData = companies.find(
        (company) => company.id === Number(selectedCompany)
      );

      const newCharts = [...charts];
      newCharts[activeDashboard] = {
        chartType,
        data: statsData,
        companyName: selectedCompanyData?.name || "Unknown Company",
        deviceType,
      };
      setCharts(newCharts);
    }
    closePopup();
  };

  const handleDelete = (index) => {
    const newCharts = [...charts];
    newCharts[index] = null;
    setCharts(newCharts);
  };

  const renderChart = (chart, index) => {
    if (!chart || !chart.data) return null;

    const data = {
      labels: ["Inactive Devices", "Active Devices"],
      datasets: [
        {
          label: "Device Stats",
          data: [
            chart.data.inactiveDevices,
            chart.data.totalDevices - chart.data.inactiveDevices,
          ],
          backgroundColor: ["#FF4D4F", "#4CAF50"],
        },
      ],
    };

    return (
      <div className="chart-container">
        <div className="chart-description">
          <p>
            <strong>Company:</strong> {chart.companyName}
          </p>
          <p>
            <strong>Device Type:</strong> {chart.deviceType}
          </p>
        </div>
        <div className="chart-content">
          {chart.chartType === "donut" ? (
            <Doughnut data={data} />
          ) : (
            <Bar data={data} />
          )}
        </div>
        <div className="chart-delete-button">
          <button
            className="crudButton greyButton paginationButton"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
          <button
            className="crudButton greyButton paginationButton"
            onClick={() => handleRefresh(index)}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  };

  const handleRefresh = async (index) => {
    const chartToUpdate = charts[index];
    if (!chartToUpdate) return;

    const statsData = await fetchStats(chartToUpdate.deviceType);
    if (statsData) {
      const newCharts = [...charts];
      newCharts[index] = {
        ...chartToUpdate,
        data: statsData,
      };
      setCharts(newCharts);
    }
  };

  return (
    <div className="dashboard-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="dashboard-item">
          {charts[index] ? (
            renderChart(charts[index], index)
          ) : (
            <button className="plus-button" onClick={() => openPopup(index)}>
              +
            </button>
          )}
        </div>
      ))}
      {popupOpen && (
        <div className="dashboard-popup-overlay">
          <div className="dashboard-popup">
            <h3>Choose a Company</h3>
            <label
              htmlFor="searchQuery"
              className="dashboard-popup-label"
            ></label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Type company name..."
              className="search-input"
              style={{ width: "282px", margin: "5px 0" }}
            />
            <select
              id="companySelect"
              onChange={(e) => setSelectedCompany(e.target.value)}
              value={selectedCompany || ""}
              className="company-select-dropdown"
            >
              <option value="" disabled>
                Select a company
              </option>
              {filteredCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <label htmlFor="chartType" className="dashboard-popup-label">
              Choose a Chart Type:
            </label>
            <div className="chart-buttons">
              <button
                className={`chart-button ${
                  chartType === "donut" ? "selected" : ""
                }`}
                onClick={() => handleChartTypeSelection("donut")}
              >
                Donut Chart
              </button>
              <button
                className={`chart-button ${
                  chartType === "bar" ? "selected" : ""
                }`}
                onClick={() => handleChartTypeSelection("bar")}
              >
                Bar Chart
              </button>
            </div>

            <label htmlFor="deviceType" className="dashboard-popup-label">
              Device Type:
            </label>
            <div className="dashboard-device-type-input">
              <input
                type="text"
                id="deviceType"
                value={deviceType}
                onChange={handleDeviceTypeChange}
              />
            </div>

            <div className="popup-buttons">
              <button
                className="crudButton greyButton paginationButton"
                style={{ backgroundColor: "gray" }}
                onClick={closePopup}
              >
                Close
              </button>
              <button
                className="crudButton greyButton paginationButton"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
