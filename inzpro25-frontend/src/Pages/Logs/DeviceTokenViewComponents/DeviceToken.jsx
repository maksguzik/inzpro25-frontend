import DeviceTokenDisplay from "./Components/DeviceTokenDisplay";
import './DeviceTokenStyle.css';

function DeviceToken({tokenId, token, deviceTypeName, setSelectedRecord}){

    const handleClick = () =>{
        setSelectedRecord({
            "id": tokenId,
            "token": token,
            "deviceTypeName": deviceTypeName,
        });
    }

    return(<tr className = "deviceToken"
                onClick = {handleClick}
            >
                <DeviceTokenDisplay
                    tokenId = {tokenId}
                    token = {token}
                    deviceTypeName = {deviceTypeName}
                />
                
            </tr>
    );
}

export default DeviceToken;