import DeviceDisplay from "./Components/DeviceDisplay";
import DeviceDelete from "./Components/DeviceDelete";
import UpdateDevice from "./Components/UpdateDevice";
import './DeviceStyle.css';


function Device({deviceId, deviceSerialNumber, deviceName, deviceType, deviceCompanyName, setUpdateDeviceList}){

    return(<tr className = "device">
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
                <UpdateDevice
                    deviceId = {deviceId}
                    setUpdateDeviceList = {setUpdateDeviceList}
                />
            </tr>
    );
}

export default Device;