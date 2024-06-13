import DeviceToken from "./DeviceToken";
import { useState, useEffect } from "react";
import AddDeviceToken from "./Components/AddDeviceToken";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";
import UpdateDeviceToken from "./Components/UpdateDeviceToken";
import './DeviceTokenStyle.css';

function DeviceTokenList(){
    const [deviceTokenList, setDeviceTokenList] = useState([]);
    const [updateDeviceTokenList, setUpdateDeviceTokenList] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const URL = 'http://localhost:8080/api/devices-tokens';

    const getDeviceTokenList = () =>{
        fetch(URL)
        .then(response => response.json())
        .then(json => setDeviceTokenList(json))
        .then(()=>setUpdateDeviceTokenList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        // (updateDeviceTokenList)? getDeviceTokenList() : null
        if (updateDeviceTokenList) getDeviceTokenList();
    });

    return(
        <div  className = "deviceTokenListContainer">
            <AddDeviceToken
            setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
            />
            {selectedRecord &&
                (<>
                    <DeviceTokenDelete
                        tokenId = {selectedRecord.id}
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        setSelectedRecord = {setSelectedRecord}
                    />
                    <UpdateDeviceToken
                        tokenId = {selectedRecord.id}
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        setSelectedRecord = {setSelectedRecord}
                    />
                    </>)}
            <table>
                <thead>
                    <tr>
                        <th>tokenId</th>
                        <th>token</th>
                        <th>deviceTypeName</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceTokenList.map((element) => (
                        <DeviceToken
                        tokenId = {element.id} 
                        token = {element.token}
                        deviceTypeName = {element.deviceTypeName} 
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        setSelectedRecord = {setSelectedRecord}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DeviceTokenList;