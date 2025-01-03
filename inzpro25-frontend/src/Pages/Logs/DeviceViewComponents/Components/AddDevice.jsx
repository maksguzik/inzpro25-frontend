import { useState } from "react";
import './DeviceComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function AddDevice({setUpdateDeviceList}){
    
    const [updateRequestBody, setUpdateRequestBody] = useState({
        "id": 0,
        "serialNumber": "",
        "name": "",
        "deviceType" : "",
        "companyName": ""
    });
    
    const {getAccessTokenSilently} = useAuth0();

    const [popup, setPopup] = useState(false);
    const URL = 'http://localhost:8080/api/devices';
    
    const addDevice = async() => {
        const token = await getAccessTokenSilently();
        fetch(URL, {
                    method: 'POST',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "id": parseInt(updateRequestBody.id),
                        "serialNumber": updateRequestBody.serialNumber,
                        "name": updateRequestBody.name,
                        "deviceType": updateRequestBody.deviceType,
                        "companyName": updateRequestBody.companyName
                    })    
                    })
            .then(response => setUpdateDeviceList(true))
            .then(()=>setPopup(false))
            .then(()=>setUpdateRequestBody({
                "id": 0,
                "serialNumber": "",
                "name": "",
                "deviceType" : "",
                "companyName": ""
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
            addDevice();
        }
    }

    const togglePopup = (event) =>{
        event.stopPropagation(); 
        setPopup(!popup);
    }


    return (
        <> 
                <div className="addToken">
                <button className = "crudButton greenButton" onClick = {togglePopup}>ADD</button>
                </div>
                
                {popup && (
                    <div className="popup">
                    <div className="overlay"
                        onClick = {togglePopup}></div>
                    <div className="popup-content deviceUpdate"  onClick={(event) => event.stopPropagation()}>
                        <div className="popup-label">New Serial Number</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.serialNumber} 
                            onChange = {(event)=>handleInputChange(event, "serialNumber")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">New Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.name} 
                            onChange = {(event)=>handleInputChange(event, "name")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">New Device Type</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.deviceType} 
                            onChange = {(event)=>handleInputChange(event, "deviceType")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">New Company Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.companyName} 
                            onChange = {(event)=>handleInputChange(event, "companyName")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <button className = "crudButton blueButton saveButton"
                        onClick = {addDevice}>SAVE</button>
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                    </div>
                </div>
                )}
            </>
    )
}

export default AddDevice;