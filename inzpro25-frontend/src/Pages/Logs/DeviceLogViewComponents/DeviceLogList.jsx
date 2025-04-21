import { useState, useEffect } from "react";
import DeviceLog from "./DeviceLog";
import "./DeviceLogStyle.css";
import "../LogUniversalViewStyle.css";
import { useAuth0 } from "@auth0/auth0-react";

function DeviceLogList() {
  const [deviceLogList, setDeviceLogList] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [currentPage, setCurrentPage] = useState(0);
  const [updateDeviceLogList, setUpdateDeviceLogList] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("logTime");
  const [serialNumber, setSerialNumber] = useState("");
  const [deviceTypeName, setDeviceTypeName] = useState("");
  const [owner, setOwner] = useState("");

  const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [chosenTimeStampRange, setChosenTimeStampRange] = useState("between");
  const [datePickedBefore, setDatePickedBefore] = useState(
    getCurrentDateTime()
  );
  const [datePickedAfter, setDatePickedAfter] = useState("2018-06-12T19:30");

  const FilterDeviceLogList = async () => {
    const token = await getAccessTokenSilently();
    fetch(
      URL +
        "api/devices-logs/" +
        chosenTimeStampRange +
        `?startTime=${datePickedAfter}:11Z&endTime=${datePickedBefore}:11Z`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setDeviceLogList(json.content);
        setTotalPages(json.totalPages);
      })
      .then(() => setUpdateDeviceLogList(false))
      .catch((error) => console.error(error));
  };

  const handleChangeAfter = (event) => {
    setDatePickedAfter(event.target.value);
    setUpdateDeviceLogList(true);
  };

  const handleChangeBefore = (event) => {
    setDatePickedBefore(event.target.value);
    setUpdateDeviceLogList(true);
  };

  const getDeviceLogList = async () => {
    const token = await getAccessTokenSilently();
    fetch(
      URL +
        "api/devices-logs/" +
        chosenTimeStampRange +
        `?startTime=${datePickedAfter}:11Z&endTime=${datePickedBefore}:11Z` +
        "&owner=" +
        owner +
        "&deviceSerialNumber=" +
        serialNumber +
        "&deviceType=" +
        deviceTypeName +
        "&page=" +
        currentPage +
        "&size=5" +
        "&sortBy=" +
        sortBy +
        "&order=" +
        order,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setDeviceLogList(json.content);
        setTotalPages(json.totalPages);
      })
      .then(() => setUpdateDeviceLogList(false))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (updateDeviceLogList) {
      getDeviceLogList();
    }
  }, [updateDeviceLogList, getDeviceLogList]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
      setUpdateDeviceLogList(true);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    setUpdateDeviceLogList(true);
  };

  const handleSortDirectionChange = (direction) => {
    setOrder(direction);
  };

  const handleSortByChange = (sortBy) => {
    setSortBy(sortBy);
  };

  return (
    <>
      <div className="orderAddDeleteContainer">
        <div className="orderContainer flex">
          <div className="searchByNameContainer">
            <input
              type="text"
              className="input-field deviceLogInputWidth"
              placeholder="Search by Serial Number"
              value={serialNumber}
              onChange={(e) => {
                setSerialNumber(e.target.value);
                setUpdateDeviceLogList(true);
              }}
            />
          </div>
          <div className="searchByNameContainer">
            <input
              type="text"
              className="input-field deviceLogInputWidth"
              placeholder="Search by Device Type"
              value={deviceTypeName}
              onChange={(e) => {
                setDeviceTypeName(e.target.value);
                setUpdateDeviceLogList(true);
              }}
            />
          </div>
          <div className="searchByNameContainer">
            <input
              type="text"
              className="input-field deviceLogInputWidth"
              placeholder="Search by Company Name"
              value={owner}
              onChange={(e) => {
                setOwner(e.target.value);
                setUpdateDeviceLogList(true);
              }}
            />
          </div>
          <div className="sortLabel">Sort By</div>
          <div className="sortDirection">
            <div className="addToken">
              <select
                className="crudButton greyButton orderButtons deviceLogOrderButtons"
                onChange={(e) => {
                  handleSortByChange(e.target.value);
                  setUpdateDeviceLogList(true);
                }}
              >
                <option value="logTime">Log Time</option>
                <option value="lastSeenTime">Last Seen</option>
                <option value="deviceType">Device Type</option>
                <option value="deviceSerialNumber">Serial Number</option>
                <option value="owner">Company Name</option>
              </select>
            </div>
          </div>
          <div className="sortDirection">
            <div className="addToken">
              <select
                className="crudButton greyButton orderButtons"
                onChange={(e) => {
                  handleSortDirectionChange(e.target.value);
                  setUpdateDeviceLogList(true);
                }}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="dataPicker">
          <label htmlFor="start-time"></label>
          <input
            className="inputDatePicker"
            type="datetime-local"
            id="start-time"
            name="start-time"
            value={datePickedAfter || "2018-06-07T00:00"}
            min="2018-06-07T00:00"
            max={getCurrentDateTime()}
            onChange={handleChangeAfter}
          />
          <label htmlFor="end-time"></label>
          <input
            className="inputDatePicker"
            type="datetime-local"
            id="end-time"
            name="end-time"
            value={datePickedBefore || "2024-06-22T12:30"}
            min="2018-06-07T00:00"
            max={getCurrentDateTime()}
            onChange={handleChangeBefore}
          />
          {/* <button
                className = "crudButton greenButton searchButton"
                onClick = {getDeviceLogList}
            >SEARCH</button> */}
        </div>
      </div>
      {/* <DeviceLogFilter
                    setDeviceLogList = {setDeviceLogList}
                /> */}
      <div className="deviceLogListContainer">
        {deviceLogList.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Id</th>
                  <th>Log Time</th>
                  <th>Last Seen</th>
                  <th>Device Type</th>
                  <th>Device Serial Number</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {deviceLogList.map((element) => (
                  <DeviceLog
                    key={element.id}
                    deviceId={element.id}
                    deviceLogTime={element.logTime}
                    deviceLastSeenTime={element.lastSeenTime}
                    deviceType={element.deviceType}
                    deviceSerialNumber={element.deviceSerialNumber}
                    owner={element.owner}
                  />
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
          <div className="no-results-message">
            {serialNumber && deviceTypeName && owner ? (
              <p>
                No device logs found for Serial Number "
                <strong>{serialNumber}</strong>
                ", Device Type "<strong>{deviceTypeName}</strong>", and Owner "
                <strong>{owner}</strong>".
              </p>
            ) : serialNumber ? (
              <p>
                No device logs found for Serial Number "
                <strong>{serialNumber}</strong>
                ".
              </p>
            ) : deviceTypeName ? (
              <p>
                No device logs found for Device Type "
                <strong>{deviceTypeName}</strong>".
              </p>
            ) : owner ? (
              <p>
                No device logs found for Owner "<strong>{owner}</strong>".
              </p>
            ) : (
              <p>No device logs found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default DeviceLogList;
