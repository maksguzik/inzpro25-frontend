import { useState } from "react";
import './DeviceTokenStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function UpdateDeviceToken({tokenId, deviceTypeName, setUpdateDeviceTokenList}){
    
    const [newDeviceTypeName, setNewDeviceTypeName] = useState(deviceTypeName);
    // const [clicked, setClicked] = useState(false);
    const [popup, setPopup] = useState(false);
    const {getAccessTokenSilently} = useAuth0();

    const URL = 'http://localhost:8080/api/devices-tokens/' + tokenId;
    
    const updateDeviceToken = async() => {
        const token = await getAccessTokenSilently();
        fetch(URL, {
                    method: 'PUT',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({deviceTypeName: newDeviceTypeName})    
                    })
            .then(response => setUpdateDeviceTokenList(true))
            .then(()=>setNewDeviceTypeName(""))
            .then(()=>setPopup(false))
            .catch(error=>console.error());
    }

    const handleInputChange = (event) =>{
        event.preventDefault();
        setNewDeviceTypeName(event.target.value);
    }

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            updateDeviceToken();
        }
    }

    // const handleClickButton = () =>{
    //     setClicked(true);
    // }

    const togglePopup = (event) =>{
        event.stopPropagation(); 
        setPopup(!popup);
    }

    return (
        <> 
            <button className = "crudButton blueButton margin" onClick = {togglePopup}>Edit</button>
            {popup && (
                <div className="popup">
                <div className="overlay"
                    onClick = {togglePopup}></div>
                <div className="popup-content"  onClick={(event) => event.stopPropagation()}>
                <div className="popup-label">New Device Type</div>
                    <input 
                        className = "inputDeviceToken" 
                        value = {newDeviceTypeName} 
                        onChange = {handleInputChange}
                        onKeyDown = {handleKeyDown}>
                     </input>
                     <button className = "crudButton blueButton saveButton"
                    onClick = {updateDeviceToken}>UPDATE</button>
                    <button className = "closeButton crudButton"
                    onClick = {togglePopup}>Close</button>
                </div>
            </div>
            )}
            
            
        </>
    )
}

export default UpdateDeviceToken;
