import './DeviceComponentStyle.css';

function DeviceDeleteAll({deviceIdDeleteList, setUpdateDeviceList}){
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
        <div className="deleteToken">
            <button className = "crudButton redButton" onClick={deleteDevice}>DELETE</button>
        </div>
        </>
    )
}

export default DeviceDeleteAll;