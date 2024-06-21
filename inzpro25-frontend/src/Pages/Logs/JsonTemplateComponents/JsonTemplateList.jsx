import { useState, useEffect } from "react";
import JsonTemplate from "./JsonTemplate";
import AddJsonTemplate from "./Components/AddJsonTemplate";
import JsonTemplateDeleteAll from "./Components/JsonTemplateDeleteAll";
import '../LogUniversalViewStyle.css';

function JsonTemplateList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);
    // const [selectedRecord, setSelectedRecord] = useState(null);
    const [deviceIdDeleteList, setDeviceIdDeleteList] = useState([]);

    const URL = 'http://localhost:8080/api/device-types';

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
                <AddJsonTemplate
                setUpdateDeviceList = {setUpdateDeviceList}
                />
                <JsonTemplateDeleteAll
                            deviceIdDeleteList = {deviceIdDeleteList}
                            setUpdateDeviceList = {setUpdateDeviceList}
                />
        </div>
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
    );
}

export default JsonTemplateList;