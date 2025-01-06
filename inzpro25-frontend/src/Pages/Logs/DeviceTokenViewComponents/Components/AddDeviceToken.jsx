import { useState } from "react";
import './DeviceTokenStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function AddDeviceToken({setUpdateDeviceTokenList}){
    
    const [deviceTypeName, setDeviceTypeName] = useState("");
    const [popup, setPopup] = useState(false);
    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const addDeviceToken = async() => {
        const token = await getAccessTokenSilently();
        const response = await fetch(URL + 'api/devices-tokens', {
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({deviceTypeName: deviceTypeName})    
                    })
        const responseData = await response.json();
        if(String(response.status).at(0)=='2'){
          setPopup(false);
          setUpdateDeviceTokenList(true);
          setDeviceTypeName("");
        }else{
          alert("Something went wrong! Please check your input and try again.");
        }
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
                <div className="popup fancyPopup">
                <div className="overlay"
                    onClick = {togglePopup}></div>
                <div className="popupContent">
                    <div className="popupLabel">New Device Type</div>
                    <input 
                        className = "inputDeviceToken" 
                        value = {deviceTypeName} 
                        onChange = {handleInputChange}
                        onKeyDown = {handleKeyDown}>
                     </input>
                     <div className="buttonsContainer">
                     <button className = "crudButton blueButton saveButton"
                    onClick = {addDeviceToken}>SAVE</button>
                    <button className = "closeButton crudButton"
                    onClick = {togglePopup}>Close</button>
                    </div>
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