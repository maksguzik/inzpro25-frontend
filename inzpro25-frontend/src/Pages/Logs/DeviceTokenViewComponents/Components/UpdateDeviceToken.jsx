import { useState } from "react";
import './DeviceTokenStyle.css';

function UpdateDeviceToken({tokenId, setUpdateDeviceTokenList}){
    
    const [deviceTypeName, setDeviceTypeName] = useState("");
    const [clicked, setClicked] = useState(false);

    const URL = 'http://localhost:8080/api/devices-tokens/' + tokenId;
    
    const updateDeviceToken = () => {
        fetch(URL, {
                    method: 'PUT',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({deviceTypeName: deviceTypeName})    
                    })
            .then(response => setUpdateDeviceTokenList(true))
            .then(()=>setDeviceTypeName(""))
            .then(()=>setClicked(false))
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

    const handleClickButton = () =>{
        setClicked(true);
    }

    return (
        <> <td>
            <button className = "greenButton" onClick = {handleClickButton}>UPDATE</button>
            </td>
            <td>
            {(clicked)? 
                <input 
                value = {deviceTypeName} 
                onChange = {handleInputChange}
                onKeyDown = {handleKeyDown}>
            </input> : <></>
            } 
            </td>
        </>
    )
}

export default UpdateDeviceToken;
