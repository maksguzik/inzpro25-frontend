import React from "react";
import { useState, useEffect } from "react";


function DeviceToken(){
    const [state, setState] = useState(null);
    const URL = 'http://localhost:8080/api/devices-tokens/0';
    useEffect(()=>{
        fetch(URL)
        .then(response => response.json())
        .then(json => setState(json))
        .catch(error => console.error(error));

        console.log(state);
    });

    return(<div className="DeviceTokenContainer">
        
    </div>);
}

export default DeviceToken;