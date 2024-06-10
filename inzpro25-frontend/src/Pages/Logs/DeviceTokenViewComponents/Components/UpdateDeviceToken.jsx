import { useState } from "react";

function UpdateDeviceToken({tokenId, setUpdateDeviceTokenList}){
    
    const [deviceTypeName, setDeviceTypeName] = useState("");

    const URL = 'http://localhost:8080/api/devices-tokens/' + tokenId;
    
    const updateDeviceToken = () => {
        fetch(URL, {
                    method: 'PUT',
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
        <> 
            <input value = {deviceTypeName} onChange = {handleInputChange}></input>
            <button onClick = {updateDeviceToken}>UPDATE</button>
        </>
    )
}

export default UpdateDeviceToken;
