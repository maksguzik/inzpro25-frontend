import { useState } from "react";
import './DeviceTokenStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function UpdateDeviceToken({tokenId, deviceTypeName, setUpdateDeviceTokenList}){
    
    const [newDeviceTypeName, setNewDeviceTypeName] = useState(deviceTypeName);
    // const [clicked, setClicked] = useState(false);
    const [popup, setPopup] = useState(false);
    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const updateDeviceToken = async() => {
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/devices-tokens/' + tokenId , {
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
                <div className="popup fancyPopup">
                <div className="overlay"
                    onClick = {togglePopup}></div>
                <div className="popupContent"  onClick={(event) => event.stopPropagation()}>
                <div className="popupLabel">New Device Type</div>
                    <input 
                        className = "inputDeviceToken" 
                        value = {newDeviceTypeName} 
                        onChange = {handleInputChange}
                        onKeyDown = {handleKeyDown}>
                     </input>
                     <div className="buttonsContainer">
                     <button className = "crudButton blueButton saveButton"
                    onClick = {updateDeviceToken}>UPDATE</button>
                    <button className = "closeButton crudButton"
                    onClick = {togglePopup}>Close</button>
                    </div>
                </div>
            </div>
            )}
            
            
        </>
    )
}

export default UpdateDeviceToken;
