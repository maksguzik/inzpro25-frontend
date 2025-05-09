import React, { useState, useEffect } from "react";
import "./AllAlerts.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function AllAlerts() {
  const [deviceStates, setDeviceStates] = useState([]);
  const [filteredDeviceStates, setFilteredDeviceStates] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  //const [searchDeviceId, setSearchDeviceId] = useState("");
  const [searchSpecificDeviceId, setSearchSpecificDeviceId] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeviceStates = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          URL + `alert/device-states?page=${currentPage}&size=8`,
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
        console.log(data);
        setDeviceStates(data.content);
        setFilteredDeviceStates(data.content);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        console.error("Error fetching device states:", err);
        setError("Failed to fetch device states.");
      }
    };

    fetchDeviceStates();
  }, [currentPage, getAccessTokenSilently]);

  /*
  useEffect(() => {
    const filtered = deviceStates.filter((state) => {
      return (
        searchDeviceId === "" ||
        state.deviceId.toString().includes(searchDeviceId.toLowerCase())
      );
    });
    setFilteredDeviceStates(filtered);
  }, [searchDeviceId, deviceStates]);
  */

  const handleGetAllDevices = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        URL + `alert/device-states?page=${currentPage}&size=8`,
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
      setDeviceStates(data.content);
      setFilteredDeviceStates(data.content);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error("Error fetching all device states:", err);
      setError("Failed to fetch device states.");
    }
  };

  const handleSearchSpecificDevice = async () => {
    if (!searchSpecificDeviceId.trim()) {
      handleGetAllDevices();
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        URL + `alert/device-states/${searchSpecificDeviceId}`,
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
      setFilteredDeviceStates([data]);
      setError(null);
    } catch (err) {
      console.error("Error searching for specific device:", err);
      setError("Failed to fetch the specific device state.");
    }
  };
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
          <label htmlFor="search-specific-device-id" className="search-label">
            Search Specific Device ID:
          </label>
          <input
            id="search-specific-device-id"
            type="text"
            placeholder="Enter Device ID to search"
            value={searchSpecificDeviceId}
            onChange={(e) => setSearchSpecificDeviceId(e.target.value)}
            className="search-input"
          />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={handleSearchSpecificDevice}
            className="crudButton greyButton searchButton"
          >
            Search Device
          </button>
          <button
            onClick={handleGetAllDevices}
            className="crudButton greyButton searchButton"
          >
            Get All Inactive
          </button>
        </div>
        {selectedDeviceId && (
          <div style={{ marginTop: "10px" }}>
            <button
              className="crudButton greyButton searchButton"
              onClick={() =>
                navigate(`/raports/device-summary/${selectedDeviceId}`)
              }
            >
              Go to Device
            </button>
          </div>
        )}
      </div>
      {filteredDeviceStates.length > 0 ? (
        <>
          <table className="device-table">
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Last Seen</th>
                <th>
                  Downtime Detection
                  <br />
                  Duration (min)
                </th>
                <th>
                  Alarm Detection
                  <br />
                  Duration (min)
                </th>
                <th>Alarm</th>
                <th>Down</th>
                <th>Send Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeviceStates.map((state, index) => (
                <tr
                  key={state.deviceId}
                  onClick={() => setSelectedDeviceId(state.deviceId)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedDeviceId === state.deviceId
                        ? "lightblue"
                        : index % 2 === 0
                        ? "#e9e7e79c"
                        : "white",
                  }}
                >
                  <td>{state.deviceId}</td>
                  <td>{new Date(state.lastSeen).toLocaleString()}</td>
                  <td>{state.downtimeDetectionDuration}</td>
                  <td>{state.alarmDetectionDuration}</td>
                  <td>
                    <span
                      className={`status-indicator ${
                        state.alarm ? "red" : "green"
                      }`}
                    ></span>
                    {state.alarm ? "Yes" : "No"}
                  </td>
                  <td>
                    <span
                      className={`status-indicator ${
                        state.down ? "red" : "green"
                      }`}
                    ></span>
                    {state.down ? "Yes" : "No"}
                  </td>
                  <td>{state.shouldSendEmail ? "Yes" : "No"}</td>
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
          <p>No device states found.</p>
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

export default AllAlerts;
