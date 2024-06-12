import DeviceTokenDisplay from "./Components/DeviceTokenDisplay";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";
import UpdateDeviceToken from "./Components/UpdateDeviceToken";

function DeviceToken({tokenId, token, deviceTypeName, setUpdateDeviceTokenList}){

    return(<div>
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
            </div>
    );
}

export default DeviceToken;