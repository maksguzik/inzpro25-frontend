import './DeviceComponentStyle.css';

function DeviceDelete({deviceId, setUpdateDeviceList}){
    const URL = 'http://localhost:8080/api/devices/' + deviceId;
    
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

export default DeviceDelete;