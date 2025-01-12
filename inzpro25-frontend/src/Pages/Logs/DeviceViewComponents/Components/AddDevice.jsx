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
    const [errors, setErrors] = useState({
        id: "",
        serialNumber: "",
        name: "",
        deviceType: "",
        companyName: "",
    });
    
    const {getAccessTokenSilently} = useAuth0();

    const [popup, setPopup] = useState(false);
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const validateForm = () => {
        const newErrors = {};
    
        if (!updateRequestBody.serialNumber.trim()) {
            newErrors.serialNumber = "Serial number cannot be empty.";
        }
        if (!updateRequestBody.name.trim()) {
            newErrors.name = "Device name cannot be empty.";
        }
        if (!updateRequestBody.deviceType.trim()) {
            newErrors.deviceType = "Device type cannot be empty.";
        }
        if (!updateRequestBody.companyName.trim()) {
            newErrors.companyName = "Company name cannot be empty.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const addDevice = async() => {
        if (!validateForm()) {
            return;
        }
        const token = await getAccessTokenSilently();
        const response = await fetch(URL + 'api/devices', {
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
        const responseData = await response.json();
        if(String(response.status).at(0)=='2'){
          setPopup(false);
          setUpdateDeviceList(true);
          setUpdateRequestBody({
            "id": 0,
            "serialNumber": "",
            "name": "",
            "deviceType" : "",
            "companyName": ""
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
                        <div className="popupLabel">Serial Number:</div>
                        <input
                            className={`inputDeviceToken ${errors.serialNumber ? "inputError" : ""}`}
                            placeholder="Enter serial number"
                            value = {updateRequestBody.serialNumber} 
                            onChange = {(event)=>handleInputChange(event, "serialNumber")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        {errors.serialNumber && <p className="errorText">{errors.serialNumber}</p>}
                        <div className="popupLabel">Name:</div>
                        <input
                            className={`inputDeviceToken ${errors.name ? "inputError" : ""}`}
                            placeholder="Enter device name"
                            value = {updateRequestBody.name} 
                            onChange = {(event)=>handleInputChange(event, "name")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        {errors.name && <p className="errorText">{errors.name}</p>}
                        <div className="popupLabel">Device Type:</div>
                        <input
                            className={`inputDeviceToken ${errors.deviceType ? "inputError" : ""}`} 
                            placeholder="Enter device type"
                            value = {updateRequestBody.deviceType} 
                            onChange = {(event)=>handleInputChange(event, "deviceType")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        {errors.deviceType && <p className="errorText">{errors.deviceType}</p>}
                        <div className="popupLabel">Company Name:</div>
                        <input
                            className={`inputDeviceToken ${errors.companyName ? "inputError" : ""}`}
                            placeholder="Enter company name"
                            value = {updateRequestBody.companyName} 
                            onChange = {(event)=>handleInputChange(event, "companyName")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        {errors.companyName && <p className="errorText">{errors.companyName}</p>}
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

export default AddDevice;