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
        const response = await fetch(URL + 'api/devices-tokens/' + tokenId , {
                    method: 'PUT',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({deviceTypeName: newDeviceTypeName})    
                    })
        const responseData = await response.json();
        if(String(response.status).at(0)=='2'){
          setPopup(false);
          setUpdateDeviceTokenList(true);
          setNewDeviceTypeName(deviceTypeName);
        }else{
          alert("Something went wrong! Please check your input and try again.");
        }
                    
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
                <div className="popupLabel">Device Type</div>
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
