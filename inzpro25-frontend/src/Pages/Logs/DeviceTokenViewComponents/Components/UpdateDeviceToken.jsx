import { useState } from "react";
import './DeviceTokenStyle.css';

function UpdateDeviceToken({tokenId, setUpdateDeviceTokenList}){
    
    const [deviceTypeName, setDeviceTypeName] = useState("");
    // const [clicked, setClicked] = useState(false);
    const [popup, setPopup] = useState(false);

    const URL = 'http://localhost:8080/api/devices-tokens/' + tokenId;
    
    const updateDeviceToken = () => {
        fetch(URL, {
                    method: 'PUT',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({deviceTypeName: deviceTypeName})    
                    })
            .then(response => setUpdateDeviceTokenList(true))
            .then(()=>setDeviceTypeName(""))
            .then(()=>setPopup(false))
            .catch(error=>console.error());
    }

    const handleInputChange = (event) =>{
        event.preventDefault();
        setDeviceTypeName(event.target.value);
    }

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            updateDeviceToken();
        }
    }

    // const handleClickButton = () =>{
    //     setClicked(true);
    // }

    const togglePopup = () =>{
        setPopup(!popup);
    }

    return (
        <> 
            <button className = "greenButton" onClick = {togglePopup}>UPDATE</button>
            {popup && (
                <div className="popup">
                <div className="overlay"
                    onClick = {togglePopup}></div>
                <div className="popup-content">
                    <>bigos</>
                    <input 
                        value = {deviceTypeName} 
                        onChange = {handleInputChange}
                        onKeyDown = {handleKeyDown}>
                    </input>
                    <button className = "greenButton"
                    onClick = {updateDeviceToken}>SAVE</button>
                </div>
            </div>
            )}
            
            
        </>
    )
}

export default UpdateDeviceToken;
