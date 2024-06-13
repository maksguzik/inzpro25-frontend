import { useState } from "react";
import './DeviceComponentStyle.css';

function AddDevice({setUpdateDeviceList}){
    
    const [updateRequestBody, setUpdateRequestBody] = useState({
        "id": 0,
        "serialNumber": "string",
        "name": "string",
        "deviceType" : "string",
        "companyName": "string"
      });

    const URL = 'http://localhost:8080/api/devices';
    
    const addDevice = () => {
        fetch(URL, {
                    method: 'POST',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({
                        "id": parseInt(updateRequestBody.id),
                        "serialNumber": updateRequestBody.serialNumber,
                        "name": updateRequestBody.name,
                        "deviceType": updateRequestBody.deviceType,
                        "companyName": updateRequestBody.companyName
                    })    
                    })
            .then(response => setUpdateDeviceList(true))
            .then(()=>setUpdateRequestBody({
                "id": 0,
                "serialNumber": "string",
                "name": "string",
                "deviceType" : "string",
                "companyName": "string"
              }))
            .catch(error=>console.error());
    }

    const handleIdChange = (event) =>{
        event.preventDefault();
        setUpdateRequestBody({
            ...updateRequestBody,
            "id" : event.target.value            
        });
    }

    const handleSerialNumberChange = (event) =>{
        event.preventDefault();
        setUpdateRequestBody({
            ...updateRequestBody,
            "serialNumber" : event.target.value            
        });
    }

    const handleNameChange = (event) =>{
        event.preventDefault();
        setUpdateRequestBody({
            ...updateRequestBody,
            "name" : event.target.value            
        });
    }

    const handleDeviceTypeChange = (event) =>{
        event.preventDefault();
        setUpdateRequestBody({
            ...updateRequestBody,
            "deviceType" : event.target.value            
        });
    }

    const handleCompanyNameChange = (event) =>{
        event.preventDefault();
        setUpdateRequestBody({
            ...updateRequestBody,
            "companyName" : event.target.value            
        });
    }


    return (
        <div className = "addDevice"> 
            <input 
                className = "inputAddDevice" 
                value = {updateRequestBody.id} 
                onChange = {handleIdChange}>
            </input>
            <input 
                className = "inputAddDevice" 
                value = {updateRequestBody.serialNumber} 
                onChange = {handleSerialNumberChange}>
            </input>
            <input 
                className = "inputAddDevice" 
                value = {updateRequestBody.name} 
                onChange = {handleNameChange}>
            </input>
            <input 
                className = "inputAddDevice" 
                value = {updateRequestBody.deviceType} 
                onChange = {handleDeviceTypeChange}>
            </input>
            <input 
                className = "inputAddDevice" 
                value = {updateRequestBody.companyName} 
                onChange = {handleCompanyNameChange}>
            </input>
            <button 
                className = "greenButton" 
                onClick = {addDevice}>
                    ADD
            </button>
        </div>
    )
}

export default AddDevice;