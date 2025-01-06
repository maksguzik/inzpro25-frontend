import { useState, useEffect } from "react";
import JsonTemplate from "./JsonTemplate";
import AddJsonTemplate from "./Components/AddJsonTemplate";
import JsonTemplateDelete from "./Components/JsonTemplateDelete";
import '../LogUniversalViewStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function JsonTemplateList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);
    // const [selectedRecord, setSelectedRecord] = useState(null);
    const [deviceIdDeleteList, setDeviceIdDeleteList] = useState([]);

    const {getAccessTokenSilently} = useAuth0();

    const URL = 'http://localhost:8080/api/device-types';

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
                <AddJsonTemplate
                setUpdateDeviceList = {setUpdateDeviceList}
                />
                <div className="deleteToken">
                    <JsonTemplateDelete
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
                        <th>Device Name</th>
                        <th>Id</th>
                        <th>Logged at</th>
                        <th>Last seen</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {deviceList.map((element, index) => (
                        <JsonTemplate
                        key = {element.deviceTypeName}
                        index = {index}
                        deviceTypeName = {element.deviceTypeName}
                        idMapping = {element.idMapping}
                        loggedAtMapping = {element.loggedAtMapping}
                        lastSeenMapping = {element.lastSeenMapping}
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

export default JsonTemplateList;