import DeviceToken from "./DeviceToken";
import { useState, useEffect } from "react";

function DeviceTokenList(){
    const [deviceTokenList, setDeviceTokenList] = useState([]);

    const URL = 'http://localhost:8080/api/devices-tokens';

    const getDeviceTokenList = () =>{
        fetch(URL)
        .then(response => response.json())
        .then(json => setDeviceTokenList(json))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getDeviceTokenList();
    });

    return(
        <div>
            {deviceTokenList.map((element) => (
                <DeviceToken
                tokenId = {element.id} 
                token = {element.token}
                deviceTypeName = {element.deviceTypeName} 
                />
            ))}
        </div>
    );
}

export default DeviceTokenList;