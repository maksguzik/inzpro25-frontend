import { useState } from "react";

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
        <> 
            <input value = {deviceTypeName} onChange = {handleInputChange}></input>
            <button onClick = {addDeviceToken}>ADD</button>
        </>
    )
}

export default AddDeviceToken;