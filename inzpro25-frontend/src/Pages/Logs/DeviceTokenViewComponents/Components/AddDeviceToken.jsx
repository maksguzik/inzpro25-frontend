import { useState } from "react";
import './DeviceTokenStyle.css';

function AddDeviceToken({setUpdateDeviceTokenList}){
    
    const [deviceTypeName, setDeviceTypeName] = useState("sensor");
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

    return (<>
            {popup && (
                <div className="popup">
                <div className="overlay"
                    onClick = {togglePopup}></div>
                <div className="popup-content">
                    <>bigos</>
                    <input 
                        className = "inputAddToken" 
                        value = {deviceTypeName} 
                        onChange = {handleInputChange}>
                     </input>
                    <button className = "greenButton"
                    onClick = {addDeviceToken}>SAVE</button>
                </div>
            </div>
            )}
            <div className = "addToken">
                <button 
                    className = "addButton" 
                    onClick = {togglePopup}>
                        ADD
                </button>
            </div>
        </>
    )
}

export default AddDeviceToken;