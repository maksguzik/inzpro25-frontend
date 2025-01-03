
function UserDevice({deviceId, deviceSerialNumber, deviceName, deviceType, deviceCompanyName}){



    return(<tr className = "deviceToken">   
                <td></td>
            <td>{deviceId}</td>
            <td>{deviceSerialNumber}</td>
            <td>{deviceName}</td>
            <td>{deviceType}</td>
            <td>{deviceCompanyName}</td>
            </tr>
    );
}

export default UserDevice;
