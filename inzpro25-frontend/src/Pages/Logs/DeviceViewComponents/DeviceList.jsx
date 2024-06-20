import { useState, useEffect } from "react";
import Device from "./Device";
import AddDevice from "./Components/AddDevice";
import DeviceDeleteAll from "./Components/DeviceDeleteAll";
import './DeviceStyle.css';
import '../LogUniversalViewStyle.css';

function DeviceList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);
    // const [selectedRecord, setSelectedRecord] = useState(null);
    const [deviceIdDeleteList, setDeviceIdDeleteList] = useState([]);

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
            <div className = "deleteAddContainer">
                <AddDevice
                setUpdateDeviceList = {setUpdateDeviceList}
                />
                <DeviceDeleteAll
                            deviceIdDeleteList = {deviceIdDeleteList}
                            setUpdateDeviceList = {setUpdateDeviceList}
                />
        </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>deviceId</th>
                        <th>serialNumber</th>
                        <th>name</th>
                        <th>deviceType</th>
                        <th>companyName</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {deviceList.map((element, index) => (
                        <Device
                        key = {element.id}
                        index = {index}
                        deviceId = {element.id} 
                        deviceSerialNumber = {element.serialNumber}
                        deviceName = {element.name}
                        deviceType = {element.deviceType}
                        deviceCompanyName = {element.companyName} 
                        setUpdateDeviceList = {setUpdateDeviceList}
                        setDeviceIdDeleteList = {setDeviceIdDeleteList}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DeviceList;