

function DeviceDisplay({deviceId, deviceSerialNumber, deviceName, deviceType, deviceCompanyName}){

    return(<>
            <td>{deviceId}</td>
            <td>{deviceSerialNumber}</td>
            <td>{deviceName}</td>
            <td>{deviceType}</td>
            <td>{deviceCompanyName}</td>
        </>
    )
}

export default DeviceDisplay;