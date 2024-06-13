import './DeviceComponentStyle.css';

function DeviceDelete({deviceId, setUpdateDeviceList, setSelectedRecord}){
    const URL = 'http://localhost:8080/api/devices/' + deviceId;
    
    const deleteDeviceToken = () => {
        fetch(URL, {method:'DELETE'})
            .then(response => setUpdateDeviceList(true))
            .then(()=>setSelectedRecord(null))
            .catch(error=>console.error());
    }

    return (
        <> 
            <button className = "redButton" onClick={deleteDeviceToken}>DELETE</button>
        </>
    )
}

export default DeviceDelete;