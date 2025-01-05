import { useState } from "react";
import './DeviceComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function UpdateDevice({deviceId, deviceSerialNumber, deviceName, deviceType, deviceCompanyName, setUpdateDeviceList}){
    
    const [updateRequestBody, setUpdateRequestBody] = useState({
        "id": deviceId,
        "serialNumber": deviceSerialNumber,
        "name": deviceName,
        "deviceType" : deviceType,
        "companyName": deviceCompanyName
    });
    const [popup, setPopup] = useState(false);

    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const updateDevice = async() => {
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/devices', {
                    method: 'POST',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updateRequestBody)    
                    })
            .then(response => setUpdateDeviceList(true))
            .then(()=>setUpdateRequestBody({
                "id": deviceId,
                "serialNumber": "",
                "name": "",
                "deviceType" : "",
                "companyName": ""
              }))
            .then(()=>setPopup(false))
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

    const togglePopup = (event) =>{
        event.stopPropagation(); 
        setPopup(!popup);
    }

    return (<> 
                <button className = "crudButton blueButton margin" onClick = {togglePopup}>Edit</button>
                {popup && (
                    <div className="popup fancyPopup">
                    <div className="overlay"
                        onClick = {togglePopup}></div>
                    <div className="popupContent deviceUpdate"  onClick={(event) => event.stopPropagation()}>
                        <div className="popupLabel">New Serial Number</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.serialNumber} 
                            onChange = {(event)=>handleInputChange(event, "serialNumber")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">New Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.name} 
                            onChange = {(event)=>handleInputChange(event, "name")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">New Device Type</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.deviceType} 
                            onChange = {(event)=>handleInputChange(event, "deviceType")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">New Company Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.companyName} 
                            onChange = {(event)=>handleInputChange(event, "companyName")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="buttonsContainer">
                        <button className = "crudButton blueButton saveButton"
                        onClick = {updateDevice}>UPDATE</button>
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                        </div>
                    </div>
                </div>
                )}
            </>
    )
}

export default UpdateDevice;