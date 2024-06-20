import DeviceTokenDisplay from "./Components/DeviceTokenDisplay";
import './DeviceTokenStyle.css';
import UpdateDeviceToken from "./Components/UpdateDeviceToken";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";
import { useState } from "react";

function DeviceToken({tokenId, token, deviceTypeName, setUpdateDeviceTokenList, setTokenIdDeleteList}){

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);

    const handleClick = () =>{
        setSelected((prevSelected) => {
            const newSelected = !prevSelected;
    
            if (newSelected) {
                setTokenIdDeleteList((prevList) => [...prevList, tokenId]);
            } else {
                setTokenIdDeleteList((prevList) =>
                    prevList.filter((element) => element !== tokenId)
                );
            }
    
            return newSelected;
        });
        // setSelectedRecord({
        //     "id": tokenId,
        //     "token": token,
        //     "deviceTypeName": deviceTypeName,
        // });
    }

    const handleHover = () =>{
        setHover(!hover);
    }

    return(<tr className = {(selected)? "deviceToken selected":"deviceToken"}
                onClick = {handleClick}
                onMouseEnter = {handleHover}
                onMouseLeave = {handleHover}
            >
                <DeviceTokenDisplay
                    tokenId = {tokenId}
                    token = {token}
                    deviceTypeName = {deviceTypeName}
                />
                {/* {hover && (
                    <td>
                    <DeviceTokenDelete
                        tokenId = {tokenId}
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        // setSelectedRecord = {setSelectedRecord}
                    />
                    <UpdateDeviceToken
                        tokenId = {tokenId}
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        // setSelectedRecord = {setSelectedRecord}
                    />
                    </td>
                )} */}
                {(hover)?(
                    <td>
                    <DeviceTokenDelete
                        tokenId = {tokenId}
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        // setSelectedRecord = {setSelectedRecord}
                    />
                    <UpdateDeviceToken
                        tokenId = {tokenId}
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        // setSelectedRecord = {setSelectedRecord}
                    />
                    </td>
                ):<div className = "noHoverDeleteToken"></div>}
            </tr>
    );
}

export default DeviceToken;