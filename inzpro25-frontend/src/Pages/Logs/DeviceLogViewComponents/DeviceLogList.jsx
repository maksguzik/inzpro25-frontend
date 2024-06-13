import { useState, useEffect } from "react";
import DeviceLog from "./DeviceLog";


function DeviceLogList(){
    const [deviceLogList, setDeviceLogList] = useState([]);

    const URL = 'http://localhost:8080/api/devices-logs';

    const getDeviceLogList = () =>{
        fetch(URL)
        .then(response => response.json())
        .then(json => setDeviceLogList(json))
        .catch(error => console.error(error));
    }

    useEffect(() => {
       getDeviceLogList();
    });

    return(
        <div  className = "deviceLogListContainer">
            <table>
                <thead>
                    <tr>
                        <th>deviceId</th>
                        <th>logTime</th>
                        <th>lastSeenTime</th>
                        <th>deviceType</th>
                        <th>deviceSerialNumber</th>
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
    );
}

export default DeviceLogList;