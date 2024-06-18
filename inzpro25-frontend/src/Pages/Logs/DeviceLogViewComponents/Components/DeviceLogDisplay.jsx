import './DeviceLogComponentStyle.css';

function DeviceLogDisplay({deviceId, deviceLogTime, deviceLastSeenTime, deviceType, deviceSerialNumber, owner}){

    return(<>
            <td>{deviceId}</td>
            <td className = "column-blue">{deviceLogTime}</td>
            <td>{deviceLastSeenTime}</td>
            <td className = "column-blue">{deviceType}</td>
            <td>{deviceSerialNumber}</td>
            <td className = "column-blue">{owner}</td>
        </>
    )
}

export default DeviceLogDisplay;