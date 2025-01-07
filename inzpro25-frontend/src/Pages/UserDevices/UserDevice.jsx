
function UserDevice({deviceId, deviceSerialNumber, deviceName, deviceType, deviceCompanyName, down}){



    return(<tr className = "deviceToken">   
                <td></td>
            <td>{deviceId}</td>
            <td>{deviceSerialNumber}</td>
            <td>{deviceName}</td>
            <td>{deviceType}</td>
            <td>{deviceCompanyName}</td>
            <td>{down}</td>
            </tr>
    );
}

export default UserDevice;
