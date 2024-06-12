import DeviceDisplay from "./Components/DeviceDisplay";
import DeviceDelete from "./Components/DeviceDelete";

function Device({deviceId, deviceSerialNumber, deviceName, deviceCompanyName, setUpdateDeviceList}){

    return(<tr className = "Device">
                <DeviceDisplay
                    deviceId = {deviceId}
                    deviceSerialNumber = {deviceSerialNumber}
                    deviceName = {deviceName}
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