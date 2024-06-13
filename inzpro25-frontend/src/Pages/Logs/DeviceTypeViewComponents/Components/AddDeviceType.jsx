import { useState } from "react";

function AddDeviceType({buttonName, setUpdateDeviceTypeList }) {
  const [deviceTypeName, setDeviceTypeName] = useState("example device type");

  const URL = "http://localhost:8080/api/device-types";

  const addDeviceType = () => {
    fetch(URL, {
                method: 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body: JSON.stringify({deviceTypeName: deviceTypeName,
                    idMapping: "to be implemented",
                    loggedAtMapping: "to be implemented",
                    lastSeenMapping: "to be implemented",})    
                })
                .then((response) => setUpdateDeviceTypeList(true))
                .then(() => setDeviceTypeName(""))
                .catch((error) => console.error());
}
  const handleInputChange = (event) => {
    event.preventDefault();
    setDeviceTypeName(event.target.value);
  };

  return (
    <>
      <input value={deviceTypeName} onChange={handleInputChange}></input>
      <button onClick={addDeviceType}>{buttonName}</button>
    </>
  );
}

export default AddDeviceType;
