import React from "react";
import { useState} from "react";
import DeviceTokenGet from "./Components/DeviceTokenGet";
import DeviceTokenDisplay from "./Components/DeviceTokenDisplay";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";


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
            <DeviceTokenDelete
            tokenId = {tokenId}
            setTokenId = {setTokenId}
            tokenData = {tokenData}
            setTokenData = {setTokenData}
            >
            </DeviceTokenDelete>
            </div>
    );
}

export default DeviceToken;