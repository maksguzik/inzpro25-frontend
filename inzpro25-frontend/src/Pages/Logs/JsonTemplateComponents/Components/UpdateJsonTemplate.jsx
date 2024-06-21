import { useState } from "react";
import './DeviceComponentStyle.css';

function UpdateJsonTemplate({deviceTypeName, setUpdateDeviceList}){
    
    const [updateRequestBody, setUpdateRequestBody] = useState({
        "deviceTypeName": deviceTypeName,
        "idMapping": "",
        "loggedAtMapping": "",
        "lastSeenMapping" : "",
    });
    const [popup, setPopup] = useState(false);

    const URL = 'http://localhost:8080/api/device-types';
    
    const updateDevice = () => {
        fetch(URL, {
                    method: 'POST',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(updateRequestBody)    
                    })
            .then(response => setUpdateDeviceList(true))
            .then(()=>setUpdateRequestBody({
                "deviceTypeName": updateRequestBody.deviceTypeName,
                "idMapping": updateRequestBody.id,
                "loggedAtMapping": updateRequestBody.loggedAtMapping,
                "lastSeenMapping": updateRequestBody.lastSeenMapping
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
                    <div className="popup">
                    <div className="overlay"
                        onClick = {togglePopup}></div>
                    <div className="popup-content deviceUpdate"  onClick={(event) => event.stopPropagation()}>
                        <div className="popup-label">Device Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.deviceTypeName} 
                            onChange = {(event)=>handleInputChange(event, "deviceTypeName")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">Id</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.idMapping} 
                            onChange = {(event)=>handleInputChange(event, "idMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">Logged At</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.loggedAtMapping} 
                            onChange = {(event)=>handleInputChange(event, "loggedAtMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">Last Seen</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.lastSeenMapping} 
                            onChange = {(event)=>handleInputChange(event, "lastSeenMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <button className = "crudButton blueButton saveButton"
                        onClick = {updateDevice}>UPDATE</button>
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                    </div>
                </div>
                )}
            </>
    )
}

export default UpdateJsonTemplate;