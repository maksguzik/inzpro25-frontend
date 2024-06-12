import DeviceDisplay from "./Components/DeviceDisplay";
import DeviceDelete from "./Components/DeviceDelete";

function Device({deviceId, deviceSerialNumber, deviceName, deviceType, deviceCompanyName, setUpdateDeviceList}){

    return(<tr className = "Device">
                <DeviceDisplay
                    deviceId = {deviceId}
                    deviceSerialNumber = {deviceSerialNumber}
                    deviceName = {deviceName}
                    deviceType = {deviceType}
                    deviceCompanyName = {deviceCompanyName}
                />
                <DeviceDelete
                    deviceId = {deviceId}
                    setUpdateDeviceList = {setUpdateDeviceList}
                />
            </tr>
    );
}

export default Device;