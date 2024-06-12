import DeviceDisplay from "./Components/DeviceDisplay";


function Device({deviceId, deviceSerialNumber, deviceName, deviceCompanyName, setUpdateDeviceList}){

    return(<tr className = "Device">
                <DeviceDisplay
                    deviceId = {deviceId}
                    deviceSerialNumber = {deviceSerialNumber}
                    deviceName = {deviceName}
                    deviceCompanyName = {deviceCompanyName}
                />
            </tr>
    );
}

export default Device;