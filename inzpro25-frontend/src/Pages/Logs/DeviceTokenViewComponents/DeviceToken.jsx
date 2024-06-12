import DeviceTokenDisplay from "./Components/DeviceTokenDisplay";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";
import UpdateDeviceToken from "./Components/UpdateDeviceToken";
import './DeviceTokenStyle.css';

function DeviceToken({tokenId, token, deviceTypeName, setUpdateDeviceTokenList}){

    return(<tr className = "DeviceToken">
                <DeviceTokenDisplay
                    tokenId = {tokenId}
                    token = {token}
                    deviceTypeName = {deviceTypeName}
                />
                <DeviceTokenDelete
                    tokenId = {tokenId}
                    setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                />
                <UpdateDeviceToken
                    tokenId = {tokenId}
                    setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                />
            </tr>
    );
}

export default DeviceToken;