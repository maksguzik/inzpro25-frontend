import { useState } from "react";
import './DeviceTokenStyle.css';

function AddDeviceToken({setUpdateDeviceTokenList}){
    
    const [deviceTypeName, setDeviceTypeName] = useState("");
    const [popup, setPopup] = useState(false);

    const URL = 'http://localhost:8080/api/devices-tokens';
    
    const addDeviceToken = () => {
        fetch(URL, {
                    method: 'POST',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({deviceTypeName: deviceTypeName})    
                    })
            .then(response => setUpdateDeviceTokenList(true))
            .then(()=>setPopup(false))
            .then(()=>setDeviceTypeName(""))
            .catch(error=>console.error());
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
                <div className="popup">
                <div className="overlay"
                    onClick = {togglePopup}></div>
                <div className="popup-content">
                    <div className="popup-label">New Device Type</div>
                    <input 
                        className = "inputDeviceToken" 
                        value = {deviceTypeName} 
                        onChange = {handleInputChange}
                        onKeyDown = {handleKeyDown}>
                     </input>
                     <button className = "crudButton blueButton saveButton"
                    onClick = {addDeviceToken}>SAVE</button>
                    <button className = "closeButton crudButton"
                    onClick = {togglePopup}>Close</button>
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