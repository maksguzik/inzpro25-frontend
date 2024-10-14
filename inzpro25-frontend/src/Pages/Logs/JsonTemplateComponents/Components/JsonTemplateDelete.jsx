import './DeviceComponentStyle.css';

function JsonTemplateDelete({deviceIdDeleteList, setUpdateDeviceList}){
    const URL = 'http://localhost:8080/api/device-types/';
    
    const deleteDevice = () => {
        for(const deviceTypeName of deviceIdDeleteList){
            fetch(URL + deviceTypeName, {method:'DELETE'})
                .then(response => setUpdateDeviceList(true))
                .catch(error=>console.error());
        } 
    }

    return (
        <> 
            <button className = "crudButton redButton" onClick={deleteDevice}>DELETED</button>
        </>
    )
}

export default JsonTemplateDelete;