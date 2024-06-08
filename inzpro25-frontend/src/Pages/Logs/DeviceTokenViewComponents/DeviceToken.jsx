import React from "react";
import { useState} from "react";
// import DeviceTokenGet from "./Components/DeviceTokenGet";
import DeviceTokenDisplay from "./Components/DeviceTokenDisplay";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";


function DeviceToken({tokenId, token, deviceTypeName}){

    return(<div className="DeviceTokenContainer">
            <DeviceTokenDisplay
            tokenId = {tokenId}
            token = {token}
            deviceTypeName = {deviceTypeName}
            >
            </DeviceTokenDisplay>
            <button>PUT</button>
            <DeviceTokenDelete
            tokenId = {tokenId}
            />
            </div>
    );
}

export default DeviceToken;