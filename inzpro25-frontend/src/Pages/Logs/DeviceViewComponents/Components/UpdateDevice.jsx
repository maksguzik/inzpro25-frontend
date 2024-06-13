import { useState } from "react";
import './DeviceComponentStyle.css';

function UpdateDevice({deviceId, setUpdateDeviceList}){
    
    const [updateRequestBody, setUpdateRequestBody] = useState({
        "id": deviceId,
        "serialNumber": "string",
        "name": "string",
        "deviceType" : "string",
        "companyName": "string"
      });

    const URL = 'http://localhost:8080/api/devices';
    
    const updateDevice = () => {
        fetch(URL, {
                    method: 'POST',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(updateRequestBody)    
                    })
            .then(response => setUpdateDeviceList(true))
            .then(()=>setUpdateRequestBody({
                "id": deviceId,
                "serialNumber": "string",
                "name": "string",
                "deviceType" : "string",
                "companyName": "string"
              }))
            .catch(error=>console.error());
    }

    const handleInputChange = (event, key) =>{
        setUpdateRequestBody({
            ...updateRequestBody,
            [key]: event.target.value
        });
    }
    

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            updateDevice();
        }
    }

    const handleClickButton = () =>{
        updateDevice();
    }

    return (
        <> 
            <button className = "greenButton" onClick = {handleClickButton}>UPDATE</button>
            <input 
                value = {updateRequestBody.serialNumber} 
                onChange = {(event)=>handleInputChange(event, "serialNumber")}
                onKeyDown = {handleKeyDown}>
            </input>
            <input 
                value = {updateRequestBody.name} 
                onChange = {(event)=>handleInputChange(event, "name")}
                onKeyDown = {handleKeyDown}>
            </input>
            <input 
                value = {updateRequestBody.deviceType} 
                onChange = {(event)=>handleInputChange(event, "deviceType")}
                onKeyDown = {handleKeyDown}>
            </input>
            <input 
                value = {updateRequestBody.companyName} 
                onChange = {(event)=>handleInputChange(event, "companyName")}
                onKeyDown = {handleKeyDown}>
            </input>
        </>
    )
}

export default UpdateDevice;