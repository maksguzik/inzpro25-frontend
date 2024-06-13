import { useState } from "react";

function AddDeviceType({ buttonName, setUpdateDeviceTypeList }) {
  const [formValues, setFormValues] = useState({
    deviceTypeName: "",
    idMapping: "",
    loggedAtMapping: "",
    lastSeenMapping: "",
  });

  const URL = "http://localhost:8080/api/device-types";

  const addDeviceType = () => {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceTypeName: formValues.deviceTypeName,
        idMapping: formValues.idMapping,
        loggedAtMapping: formValues.loggedAtMapping,
        lastSeenMapping: formValues.lastSeenMapping,
      }),
    })
      .then((response) => setUpdateDeviceTypeList(true))
      .then(() =>
        setFormValues({
          deviceTypeName: "",
          idMapping: "",
          loggedAtMapping: "",
          lastSeenMapping: "",
        })
      )
      .catch((error) => console.error());
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      <input
        name="deviceTypeName"
        value={formValues.deviceTypeName}
        onChange={handleInputChange}
        placeholder="Device Type Name"
      ></input>
      <input
        name="idMapping"
        value={formValues.idMapping}
        onChange={handleInputChange}
        placeholder="ID Mapping"
      ></input>
      <input
        name="loggedAtMapping"
        value={formValues.loggedAtMapping}
        onChange={handleInputChange}
        placeholder="Logged At Mapping"
      ></input>
      <input
        name="lastSeenMapping"
        value={formValues.lastSeenMapping}
        onChange={handleInputChange}
        placeholder="Last Seen Mapping"
      ></input>
      <button onClick={addDeviceType}>{buttonName}</button>
    </>
  );
}

export default AddDeviceType;
