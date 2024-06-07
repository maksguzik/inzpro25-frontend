import React from "react";
import { useState} from "react";
import DeviceTokenGet from "./Components/DeviceTokenGet";
import DeviceTokenDisplay from "./Components/DeviceTokenDisplay";

function DeviceToken(){
    const [tokenId, setTokenId] = useState("");
    const [tokenData, setTokenData] = useState([]);
    

    return(<div className="DeviceTokenContainer">
            <DeviceTokenDisplay
            tokenData = {tokenData}
            >
            </DeviceTokenDisplay>
            <DeviceTokenGet 
            tokenId = {tokenId}
            setTokenId = {setTokenId}
            tokenData = {tokenData}
            setTokenData = {setTokenData}
            >
            </DeviceTokenGet>
            <button>PUT</button>
            <input></input>
            <button>DELETE</button>
            <input></input>
            </div>
    );
}

export default DeviceToken;