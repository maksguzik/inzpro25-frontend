import { useState, useEffect } from "react";
import Device from "./Device";
import AddDevice from "./Components/AddDevice";
import DeviceDelete from "./Components/DeviceDelete";
import UpdateDevice from "./Components/UpdateDevice";
import './DeviceStyle.css';

function DeviceList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const URL = 'http://localhost:8080/api/devices';

    const getDeviceList = () =>{
        fetch(URL)
        .then(response => response.json())
        .then(json => setDeviceList(json))
        .then(()=>setUpdateDeviceList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (updateDeviceList) getDeviceList();
    });

    return(
        <div  className = "deviceListContainer">
            <AddDevice
            setUpdateDeviceList = {setUpdateDeviceList}
            />
            {selectedRecord &&
                (<><DeviceDelete
                    deviceId = {selectedRecord.id}
                    setUpdateDeviceList = {setUpdateDeviceList}
                    setSelectedRecord = {setSelectedRecord}
                />
                <UpdateDevice
                    deviceId = {selectedRecord.id}
                    setUpdateDeviceList = {setUpdateDeviceList}
                    setSelectedRecord = {setSelectedRecord}
                />
                </>)}
            <table>
                <thead>
                    <tr>
                        <th>deviceId</th>
                        <th>serialNumber</th>
                        <th>name</th>
                        <th>deviceType</th>
                        <th>companyName</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceList.map((element) => (
                        <Device
                        deviceId = {element.id} 
                        deviceSerialNumber = {element.serialNumber}
                        deviceName = {element.name}
                        deviceType = {element.deviceType}
                        deviceCompanyName = {element.companyName} 
                        setUpdateDeviceList = {setUpdateDeviceList}
                        setSelectedRecord = {setSelectedRecord}
                        />
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default DeviceList;