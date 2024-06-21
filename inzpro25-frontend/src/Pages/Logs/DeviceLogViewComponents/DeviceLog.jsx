import DeviceLogDisplay from "./Components/DeviceLogDisplay"
import './DeviceLogStyle.css';

function DeviceLog({deviceId, deviceLogTime, deviceLastSeenTime, deviceType, deviceSerialNumber, owner}){

    return(<tr className = "deviceToken">
                <DeviceLogDisplay
                    deviceId = {deviceId}
                    deviceLogTime = {deviceLogTime}
                    deviceLastSeenTime = {deviceLastSeenTime}
                    deviceType = {deviceType}
                    deviceSerialNumber = {deviceSerialNumber}
                    owner = {owner}
                />
            </tr>
    );
}

export default DeviceLog;