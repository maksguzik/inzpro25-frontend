import DeviceDisplay from "./Components/DeviceDisplay";
import './DeviceStyle.css';


function Device({deviceId, deviceSerialNumber, deviceName, deviceType, deviceCompanyName, setSelectedRecord}){

    const handleClick = () =>{
        setSelectedRecord({
            "id": deviceId,
            "serialNumber": deviceSerialNumber,
            "name": deviceName,
            "deviceType" : deviceType,
            "companyName": deviceCompanyName
        });
    }
    return(<tr className = "device"
                onClick = {handleClick}>
                <DeviceDisplay
                    deviceId = {deviceId}
                    deviceSerialNumber = {deviceSerialNumber}
                    deviceName = {deviceName}
                    deviceType = {deviceType}
                    deviceCompanyName = {deviceCompanyName}
                />
            </tr>
    );
}

export default Device;