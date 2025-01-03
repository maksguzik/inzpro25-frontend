import { useState } from "react";
import './DeviceComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function AddJsonTemplate({setUpdateDeviceList}){
    
    const [updateRequestBody, setUpdateRequestBody] = useState({
        "deviceTypeName": "",
        "idMapping": "",
        "loggedAtMapping": "",
        "lastSeenMapping" : "",
    });
    const [popup, setPopup] = useState(false);
    const {getAccessTokenSilently} = useAuth0();

    const URL = 'http://localhost:8080/api/device-types';
    
    const addDevice = async() => {
        const token = await getAccessTokenSilently();
        fetch(URL, {
                    method: 'POST',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "deviceTypeName": updateRequestBody.deviceTypeName,
                        "idMapping": updateRequestBody.idMapping,
                        "loggedAtMapping": updateRequestBody.loggedAtMapping,
                        "lastSeenMapping": updateRequestBody.lastSeenMapping
                    })    
                    })
            .then(response => setUpdateDeviceList(true))
            .then(()=>setPopup(false))
            .then(()=>setUpdateRequestBody({
                "deviceTypeName": "",
                "idMapping": "",
                "loggedAtMapping" : "",
                "lastSeenMapping": ""
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
                            value = {updateRequestBody.deviceType} 
                            onChange = {(event)=>handleInputChange(event, "loggedAtMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">Last Seen</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.companyName} 
                            onChange = {(event)=>handleInputChange(event, "lastSeenMapping")}
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

export default AddJsonTemplate;