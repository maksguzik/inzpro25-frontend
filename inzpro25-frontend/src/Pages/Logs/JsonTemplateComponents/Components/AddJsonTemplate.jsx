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
    const [errors, setErrors] = useState({
        deviceTypeName: "",
        idMapping: "",
        loggedAtMapping: "",
        lastSeenMapping: "",
    });

    const validateForm = () => {
        const newErrors = {};
    
        if (!updateRequestBody.deviceTypeName.trim()) {
            newErrors.deviceTypeName = "Device type cannot be empty.";
        }
        if (!updateRequestBody.idMapping.trim()) {
            newErrors.idMapping = "Mapping ID cannot be empty.";
        }
        if (!updateRequestBody.loggedAtMapping.trim()) {
            newErrors.loggedAtMapping = "Logged At cannot be empty.";
        }
        if (!updateRequestBody.lastSeenMapping.trim()) {
            newErrors.lastSeenMapping = "Last Seen cannot be empty.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const addDevice = async() => {
        if (!validateForm()) {
            return;
        }
        const token = await getAccessTokenSilently();
        const response  = await fetch(URL + 'api/device-types', {
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
            const responseData = await response.json();
            if(String(response.status).at(0)=='2'){
              setPopup(false);
              setUpdateDeviceList(true);
              setUpdateRequestBody({
                "deviceTypeName": "",
                "idMapping": "",
                "loggedAtMapping" : "",
                "lastSeenMapping": ""
              });
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
                    <div className="popup fancyPopup">
                    <div className="overlay"
                        onClick = {togglePopup}></div>
                    <div className="popupContent deviceUpdate"  onClick={(event) => event.stopPropagation()}>
                        <div className="popupLabel">Device Type:</div>
                        <input
                            className={`inputDeviceToken ${errors.deviceTypeName ? "inputError" : ""}`}
                            placeholder="Enter device type"
                            value = {updateRequestBody.deviceTypeName} 
                            onChange = {(event)=>handleInputChange(event, "deviceTypeName")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        {errors.deviceTypeName && <p className="errorText">{errors.deviceTypeName}</p>}
                        <div className="popupLabel">Mapping Id:</div>
                        <input
                            className={`inputDeviceToken ${errors.idMapping ? "inputError" : ""}`}
                            value = {updateRequestBody.idMapping} 
                            placeholder="Enter mapping id format"
                            onChange = {(event)=>handleInputChange(event, "idMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        {errors.idMapping && <p className="errorText">{errors.idMapping}</p>}
                        <div className="popupLabel">Logged At:</div>
                        <input
                            className={`inputDeviceToken ${errors.loggedAtMapping ? "inputError" : ""}`}
                            placeholder="Enter logged at format"
                            value = {updateRequestBody.deviceType} 
                            onChange = {(event)=>handleInputChange(event, "loggedAtMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        {errors.loggedAtMapping && <p className="errorText">{errors.loggedAtMapping}</p>}

                        <div className="popupLabel">Last Seen:</div>
                        <input
                            className={`inputDeviceToken ${errors.lastSeenMapping ? "inputError" : ""}`}
                            placeholder="Enter last seen format"
                            value = {updateRequestBody.companyName} 
                            onChange = {(event)=>handleInputChange(event, "lastSeenMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        {errors.lastSeenMapping && <p className="errorText">{errors.lastSeenMapping}</p>}
                        <div className="buttonsContainer">
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                        <button className = "crudButton blueButton saveButton"
                        onClick = {addDevice}>SAVE</button>
                        </div>
                    </div>
                </div>
                )}
            </>
    )
}

export default AddJsonTemplate;