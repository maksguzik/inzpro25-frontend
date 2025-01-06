import React, { useState, useEffect } from "react";
import "./DeviceSummaryTable.css";
import { useAuth0 } from "@auth0/auth0-react";

function DeviceSummaryTable({ companyId }) {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [deviceStates, setDeviceStates] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchDeviceId, setSearchDeviceId] = useState("");
  const [searchDeviceType, setSearchDeviceType] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          `http://localhost:8080/api/companies/${companyId}/devices?page=${currentPage}&size=8&sortBy=id&order=asc`,
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
        setDevices(data.content);
        setFilteredDevices(data.content);
        setTotalPages(data.totalPages);
        setError(null);

        data.content.forEach((device) => fetchDeviceState(device.id));
      } catch (err) {
        console.error("Error fetching devices:", err);
        setError("Failed to fetch devices. Please try again.");
      }
    };

    const fetchDeviceState = async (id) => {
      try {
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
        setDeviceStates((prevStates) => ({
          ...prevStates,
          [id]: data.down ? "Inactive" : "Active",
        }));
      } catch (err) {
        console.error(`Error fetching state for device ${id}:`, err);
        setDeviceStates((prevStates) => ({
          ...prevStates,
          [id]: "Unknown",
        }));
      }
    };

    fetchDevices();
  }, [companyId, currentPage, getAccessTokenSilently]);

  useEffect(() => {
    const filtered = devices.filter((device) => {
      const matchesDeviceId =
        searchDeviceId === "" ||
        device.id.toString().includes(searchDeviceId.toLowerCase());
      const matchesDeviceType =
        searchDeviceType === "" ||
        device.deviceType
          .toLowerCase()
          .includes(searchDeviceType.toLowerCase());
      return matchesDeviceId && matchesDeviceType;
    });
    setFilteredDevices(filtered);
  }, [searchDeviceId, searchDeviceType, devices]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="device-table-container">
      {error && <p className="error">{error}</p>}
      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="search-device-id" className="search-label">
            Search Device ID:
          </label>
          <input
            id="search-device-id"
            type="text"
            placeholder="Enter Device ID"
            value={searchDeviceId}
            onChange={(e) => setSearchDeviceId(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="search-device-type" className="search-label">
            Search Device Type:
          </label>
          <input
            id="search-device-type"
            type="text"
            placeholder="Enter Device Type"
            value={searchDeviceType}
            onChange={(e) => setSearchDeviceType(e.target.value)}
            className="search-input"
          />
        </div>
        {selectedDeviceId && (
          <div style={{ marginTop: "10px" }}>
            <button
              className="crudButton greyButton paginationButton"
              onClick={() =>
                (window.location.href = `/Raports/Device Summary/${selectedDeviceId}`)
              }
            >
              Go to the Device
            </button>
          </div>
        )}
      </div>
      {filteredDevices.length > 0 ? (
        <>
          <table className="device-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Serial Number</th>
                <th>Name</th>
                <th>Device Type</th>
                <th>Company Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => (
                <tr
                  key={device.id}
                  onClick={() => setSelectedDeviceId(device.id)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedDeviceId === device.id
                        ? "lightgray"
                        : "transparent",
                  }}
                >
                  <td>{device.id}</td>
                  <td>{device.serialNumber}</td>
                  <td>{device.name}</td>
                  <td>{device.deviceType}</td>
                  <td>{device.companyName}</td>
                  <td>
                    {deviceStates[device.id] === "Active" && (
                      <span className="status-indicator active"></span>
                    )}
                    {deviceStates[device.id] === "Inactive" && (
                      <span className="status-indicator inactive"></span>
                    )}
                    {deviceStates[device.id] || "Loading..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="crudButton greyButton paginationButton"
            >
              ◀ Previous
            </button>
            <span className="paginationInfo">PAGE {currentPage + 1}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className="crudButton greyButton paginationButton"
            >
              Next ▶
            </button>
          </div>
        </>
      ) : (
        <>
          <p>No devices found.</p>
          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="crudButton greyButton paginationButton"
            >
              ◀ Previous
            </button>
            <span className="paginationInfo">PAGE {currentPage + 1}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className="crudButton greyButton paginationButton"
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DeviceSummaryTable;
