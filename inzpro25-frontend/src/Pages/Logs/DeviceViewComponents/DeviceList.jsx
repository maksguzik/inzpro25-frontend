import { useState, useEffect } from "react";
import Device from "./Device";


function DeviceList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);

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
            {deviceList.map((element) => (
                <Device
                deviceId = {element.id} 
                deviceSerialNumber = {element.serialNumber}
                deviceName = {element.name}
                deviceCompanyName = {element.companyName} 
                setUpdateDeviceList = {setUpdateDeviceList}
                />
            ))}
        </div>
    );
}

export default DeviceList;