import { useState } from "react";
import './DeviceTokenStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function AddDeviceToken({setUpdateDeviceTokenList}){
    
    const [deviceTypeName, setDeviceTypeName] = useState("");
    const [popup, setPopup] = useState(false);
    const {getAccessTokenSilently} = useAuth0();
    const [error, setError] = useState("");

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const validateForm = () => {
        if (!deviceTypeName.trim()) {
            setError("Device type cannot be empty.");
            return false;
        }
        setError("");
        return true;
    };

    const addDeviceToken = async() => {
        if (!validateForm()) {
            return;
        }
        const token = await getAccessTokenSilently();
        const response = await fetch(URL + 'api/devices-tokens', {
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({deviceTypeName: deviceTypeName})    
                    })
        const responseData = await response.json();
        if(String(response.status).at(0)=='2'){
          setPopup(false);
          setUpdateDeviceTokenList(true);
          setDeviceTypeName("");
        }else{
          alert("Something went wrong! Please check your input and try again.");
        }
    }

    const handleInputChange = (event) =>{
        event.preventDefault();
        setDeviceTypeName(event.target.value);
    }

    const togglePopup = () =>{
        setPopup(!popup);
    }

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            addDeviceToken();
        }
    }

    return (<>
            {popup && (
                <div className="popup fancyPopup">
                <div className="overlay"
                    onClick = {togglePopup}></div>
                <div className="popupContent">
                    <div className="popupLabel">Device Type:</div>
                    <input 
                        className={`inputDeviceToken ${error ? "inputError" : ""}`}
                        placeholder="Enter device type"
                        value = {deviceTypeName} 
                        onChange = {handleInputChange}
                        onKeyDown = {handleKeyDown}>
                     </input>
                     {error && <p className="errorText">{error}</p>}
                     <div className="buttonsContainer">
                     <button className = "closeButton crudButton"
                    onClick = {togglePopup}>Close</button>
                     <button className = "crudButton blueButton saveButton"
                    onClick = {addDeviceToken}>SAVE</button>
                    </div>
                </div>
            </div>
            )}
            <div className = "addToken">
                <button 
                    className = "crudButton greenButton" 
                    onClick = {togglePopup}>
                        ADD
                </button>
            </div>
        </>
    )
}

export default AddDeviceToken;