import './DeviceLogComponentStyle.css';

function DeviceLogDisplay({deviceId, deviceLogTime, deviceLastSeenTime, deviceType, deviceSerialNumber, owner}){

    return(<>
            <td></td>
            <td>{deviceId}</td>
            <td>{deviceLogTime}</td>
            <td>{deviceLastSeenTime}</td>
            <td>{deviceType}</td>
            <td>{deviceSerialNumber}</td>
            <td>{owner}</td>
        </>
    )
}

export default DeviceLogDisplay;