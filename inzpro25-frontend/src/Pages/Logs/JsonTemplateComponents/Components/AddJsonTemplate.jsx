import { useState } from "react";
import './DeviceComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function AddJsonTemplate({setUpdateDeviceList}){
    
    const [updateRequestBody, setUpdateRequestBody] = useState({
        "deviceTypeName": "",
        "idMapping": "",
        "loggedAtMapping": "",
        "lastSeenMapping" : "",
    });
    const [popup, setPopup] = useState(false);
    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const addDevice = async() => {
        const token = await getAccessTokenSilently();
        const response  = await fetch(URL + 'api/device-types', {
                    method: 'POST',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "deviceTypeName": updateRequestBody.deviceTypeName,
                        "idMapping": updateRequestBody.idMapping,
                        "loggedAtMapping": updateRequestBody.loggedAtMapping,
                        "lastSeenMapping": updateRequestBody.lastSeenMapping
                    })    
                    })
            const responseData = await response.json();
            if(String(response.status).at(0)=='2'){
              setPopup(false);
              setUpdateDeviceList(true);
              setUpdateRequestBody({
                "deviceTypeName": "",
                "idMapping": "",
                "loggedAtMapping" : "",
                "lastSeenMapping": ""
              });
            }else{
              alert("Something went wrong! Please check your input and try again.");
            }
    }

    const handleInputChange = (event, key) =>{
        setUpdateRequestBody({
            ...updateRequestBody,
            [key]: event.target.value
        });
    }
    

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            addDevice();
        }
    }

    const togglePopup = (event) =>{
        event.stopPropagation(); 
        setPopup(!popup);
    }


    return (
        <> 
                <div className="addToken">
                <button className = "crudButton greenButton" onClick = {togglePopup}>ADD</button>
                </div>
                
                {popup && (
                    <div className="popup fancyPopup">
                    <div className="overlay"
                        onClick = {togglePopup}></div>
                    <div className="popupContent deviceUpdate"  onClick={(event) => event.stopPropagation()}>
                        <div className="popupLabel">Device Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.deviceTypeName} 
                            onChange = {(event)=>handleInputChange(event, "deviceTypeName")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">Mapping Id</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.idMapping} 
                            onChange = {(event)=>handleInputChange(event, "idMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">Logged At</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.deviceType} 
                            onChange = {(event)=>handleInputChange(event, "loggedAtMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popupLabel">Last Seen</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {updateRequestBody.companyName} 
                            onChange = {(event)=>handleInputChange(event, "lastSeenMapping")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="buttonsContainer">
                        <button className = "crudButton blueButton saveButton"
                        onClick = {addDevice}>SAVE</button>
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                        </div>
                    </div>
                </div>
                )}
            </>
    )
}

export default AddJsonTemplate;