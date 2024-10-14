import './DeviceComponentStyle.css';

function DeviceDelete({deviceIdDeleteList, setUpdateDeviceList}){
    const URL = 'http://localhost:8080/api/devices/';
    
    const deleteDevice = () => {
        for(const deviceId of deviceIdDeleteList){
            fetch(URL + deviceId, {method:'DELETE'})
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

export default DeviceDelete;