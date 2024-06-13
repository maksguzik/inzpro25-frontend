import { useState } from "react";
import './DeviceTokenStyle.css';

function AddDeviceToken({setUpdateDeviceTokenList}){
    
    const [deviceTypeName, setDeviceTypeName] = useState("sensor");

    const URL = 'http://localhost:8080/api/devices-tokens';
    
    const addDeviceToken = () => {
        fetch(URL, {
                    method: 'POST',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({deviceTypeName: deviceTypeName})    
                    })
            .then(response => setUpdateDeviceTokenList(true))
            .then(()=>setDeviceTypeName(""))
            .catch(error=>console.error());
    }

    const handleInputChange = (event) =>{
        event.preventDefault();
        setDeviceTypeName(event.target.value);
    }

    return (
        <div className = "addToken"> 
            <input 
                className = "inputAddToken" 
                value = {deviceTypeName} 
                onChange = {handleInputChange}>
            </input>
            <button 
                className = "greenButton" 
                onClick = {addDeviceToken}>
                    ADD
            </button>
        </div>
    )
}

export default AddDeviceToken;