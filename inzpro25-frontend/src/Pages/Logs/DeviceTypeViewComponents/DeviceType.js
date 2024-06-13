import { useEffect, useState } from "react";
import "./DeviceType.css";
import DeviceTypeListRecord from "./Components/DeviceTypeListRecord";
import AddDeviceType from "./Components/AddDeviceType";
import DeleteDeviceType from "./Components/DeleteDeviceType";

function DeviceType() {
  const [deviceTypeList, setDeviceTypeList] = useState([]);
  const [updateDeviceTypeList, setUpdateDeviceTypeList] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const URL = "http://localhost:8080/api/device-types";

  const getDeviceTypeList = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setDeviceTypeList(json))
      .then(() => setUpdateDeviceTypeList(false))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (updateDeviceTypeList) getDeviceTypeList();
  });

  return (
    <>
      <div>
        <AddDeviceType setUpdateDeviceTypeList={setUpdateDeviceTypeList} />
        {selectedRecord && (
          <DeleteDeviceType
            name={selectedRecord.deviceTypeName}
            setUpdateDeviceTypeList={setUpdateDeviceTypeList}
          />
        )}
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Device Type Name</th>
              <th>ID Mapping</th>
              <th>Logged At Mapping</th>
              <th>Last Seen Mapping</th>
            </tr>
          </thead>
          <tbody>
            {deviceTypeList.map((item, index) => (
              <DeviceTypeListRecord
                index={index}
                deviceTypeName={item.deviceTypeName}
                idMapping={item.idMapping}
                loggedAtMapping={item.loggedAtMapping}
                lastSeenMapping={item.lastSeenMapping}
                onClick={() => setSelectedRecord(item)}
                isSelected={
                  selectedRecord &&
                  selectedRecord.deviceTypeName === item.deviceTypeName
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DeviceType;
