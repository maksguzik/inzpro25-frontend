import { useState } from "react";
import './DeviceComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function UpdateJsonTemplate({deviceId, deviceTypeName, idMapping, loggedAtMapping, lastSeenMapping, setUpdateDeviceList}){
    
    const [updateRequestBody, setUpdateRequestBody] = useState({
        "deviceTypeName": deviceTypeName,
        "idMapping": idMapping,
        "loggedAtMapping": loggedAtMapping,
        "lastSeenMapping" : lastSeenMapping,
    });
    const {getAccessTokenSilently} = useAuth0();
    const [popup, setPopup] = useState(false);

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const updateDevice = async() => {
        const token = await getAccessTokenSilently();
        const response = await fetch(URL + 'api/device-types/' + deviceId, {
                    method: 'PUT',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updateRequestBody)    
                    })
            const responseData = await response.json();
            if(String(response.status).at(0)=='2'){
              setPopup(false);
              setUpdateDeviceList(true);
              setUpdateRequestBody({
                "deviceTypeName": updateRequestBody.deviceTypeName,
                "idMapping": updateRequestBody.id,
                "loggedAtMapping": updateRequestBody.loggedAtMapping,
                "lastSeenMapping": updateRequestBody.lastSeenMapping
              })
            }else{
              alert("Something went wrong! Please check your input and try again.");
            }
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
                        <div className="popupLabel">Device Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.deviceTypeName} 
                            onChange = {(event)=>handleInputChange(event, "deviceTypeName")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">Id Mapping</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.idMapping} 
                            onChange = {(event)=>handleInputChange(event, "idMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">Logged At</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.loggedAtMapping} 
                            onChange = {(event)=>handleInputChange(event, "loggedAtMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">Last Seen</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.lastSeenMapping} 
                            onChange = {(event)=>handleInputChange(event, "lastSeenMapping")}
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

export default UpdateJsonTemplate;