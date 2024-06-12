

function DeviceDisplay({deviceId, deviceSerialNumber, deviceName, deviceCompanyName}){

    return(<>
            <td>{deviceId}</td>
            <td>{deviceSerialNumber}</td>
            <td>{deviceName}</td>
            <td>{deviceCompanyName}</td>
        </>
    )
}

export default DeviceDisplay;