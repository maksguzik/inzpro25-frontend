import { useState, useEffect } from "react";
import Device from "./Device";
import AddDevice from "./Components/AddDevice";
import DeviceDelete from "./Components/DeviceDelete";
import './DeviceStyle.css';
import '../LogUniversalViewStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);
    // const [selectedRecord, setSelectedRecord] = useState(null);
    const [deviceIdDeleteList, setDeviceIdDeleteList] = useState([]);

    const {getAccessTokenSilently} = useAuth0();

    const URL = 'http://localhost:8080/api/devices';

    const getDeviceList = async() =>{
        const token = await getAccessTokenSilently();
        console.log(token);
        fetch(URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => setDeviceList(json.content))
        .then(()=>setUpdateDeviceList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (updateDeviceList) getDeviceList();
    });

    return(<>
        <div className = "deleteAddContainer">
                <AddDevice
                setUpdateDeviceList = {setUpdateDeviceList}
                />
                <div className="deleteToken">
                    <DeviceDelete
                            deviceIdDeleteList = {deviceIdDeleteList}
                            setUpdateDeviceList = {setUpdateDeviceList}
                    />
                </div>
            </div>
        <div  className = "deviceListContainer">
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>serial Number</th>
                        <th>name</th>
                        <th>device Type</th>
                        <th>owner</th>
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
        </>
    );
}

export default DeviceList;