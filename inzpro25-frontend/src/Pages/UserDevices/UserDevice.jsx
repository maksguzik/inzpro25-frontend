import './userdevice.css';

function UserDevice({
  deviceId,
  deviceSerialNumber,
  deviceName,
  deviceType,
  deviceCompanyName,
  down,
}) {
  return (
    <tr className="deviceToken">
      <td></td>
      <td>{deviceId}</td>
      <td>{deviceSerialNumber}</td>
      <td>{deviceName}</td>
      <td>{deviceType}</td>
      <td>{deviceCompanyName}</td>
      <td>
      <span className={`status-dot ${down ? 'inactive' : 'active'}`}></span>
        {down === false ? "Active" : "Inactive"}
      </td>
    </tr>
  );
}

export default UserDevice;
