import './DeviceComponentStyle.css';

function JsonTemplateDelete({deviceTypeName, setUpdateDeviceList}){
    const URL = `http://localhost:8080/api/device-types/${deviceTypeName}`;
    
    const deleteDevice = () => {
        fetch(URL, {method:'DELETE'})
            .then(response => setUpdateDeviceList(true))
            .catch(error=>console.error());
    }

    return (
        <> 
            <button className = "crudButton redButton" onClick={deleteDevice}>DELETE</button>
        </>
    )
}

export default JsonTemplateDelete;