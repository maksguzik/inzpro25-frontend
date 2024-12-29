import DeviceToken from "./DeviceToken";
import { useState, useEffect } from "react";
import AddDeviceToken from "./Components/AddDeviceToken";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";
import './DeviceTokenStyle.css';
import '../LogUniversalViewStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceTokenList(){
    const [deviceTokenList, setDeviceTokenList] = useState([]);
    const [updateDeviceTokenList, setUpdateDeviceTokenList] = useState(true);
    // const [selectedRecord, setSelectedRecord] = useState(null);
    const [tokenIdDeleteList, setTokenIdDeleteList] = useState([]);

    const {getAccessTokenSilently} = useAuth0();

    const URL = 'http://localhost:8080/api/devices-tokens';

    const getDeviceTokenList = async() =>{
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
        .then(json => setDeviceTokenList(json))
        .then(()=>setUpdateDeviceTokenList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (updateDeviceTokenList) getDeviceTokenList();
    });

    return(<>
    <div className = "deleteAddContainer">
                <AddDeviceToken
                setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                />
                <div className="deleteToken">
                <DeviceTokenDelete
                            tokenIdDeleteList = {tokenIdDeleteList}
                            setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                />
                </div>
            </div>
        <div  className = "deviceTokenListContainer">
            
            
            <table>
                <thead>
                    <tr>
                    <th></th>
                        <th>Id</th>
                        <th>token</th>
                        <th>device Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className = "kielba">
                    {deviceTokenList.map((element, index) => (
                        <DeviceToken
                        key = {element.id}
                        index = {index}
                        tokenId = {element.id} 
                        token = {element.token}
                        deviceTypeName = {element.deviceTypeName} 
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        setTokenIdDeleteList = {setTokenIdDeleteList}
                        />
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default DeviceTokenList;