import DeviceLogDisplay from "./Components/DeviceLogDisplay"


function DeviceLog({deviceId, deviceLogTime, deviceLastSeenTime, deviceType, deviceSerialNumber, owner}){

    return(<tr className = "deviceLog">
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