import { useState, useEffect } from "react";
import DeviceLog from "./DeviceLog";
import DeviceLogFilter from "./Components/DeviceLogFilter";
import './DeviceLogStyle.css';
import '../LogUniversalViewStyle.css';

function DeviceLogList(){
    const [deviceLogList, setDeviceLogList] = useState([]);

    const URL = 'http://localhost:8080/api/devices-logs';

    const getDeviceLogList = () =>{
        fetch(URL)
        .then(response => response.json())
        .then(json => setDeviceLogList(json.reverse()))
        .catch(error => console.error(error));
    }

    useEffect(() => {
       getDeviceLogList();
    },[]);

    return(<>
        <DeviceLogFilter
                    setDeviceLogList = {setDeviceLogList}
                />
        <div  className = "deviceLogListContainer">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>log Time</th>
                        <th>last Seen</th>
                        <th>device Type</th>
                        <th>device Serial Number</th>
                        <th>owner</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceLogList.map((element) => (
                        <DeviceLog
                        deviceId = {element.id} 
                        deviceLogTime = {element.logTime}
                        deviceLastSeenTime = {element.lastSeenTime}
                        deviceType = {element.deviceType}
                        deviceSerialNumber = {element.deviceSerialNumber} 
                        owner = {element.owner}
                        />
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default DeviceLogList;