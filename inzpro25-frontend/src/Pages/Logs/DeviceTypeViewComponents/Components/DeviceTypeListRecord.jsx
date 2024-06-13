
function DeviceTypeListRecord({index, deviceTypeName, idMapping, loggedAtMapping,lastSeenMapping, onClick, isSelected}) {
  return (
    <tr key={index} onClick={onClick} className={isSelected ? 'selected' : ''}>
      <td>{deviceTypeName}</td>
      <td>{idMapping}</td>
      <td>{loggedAtMapping}</td>
      <td>{lastSeenMapping}</td>
    </tr>
  );
}

export default DeviceTypeListRecord;
