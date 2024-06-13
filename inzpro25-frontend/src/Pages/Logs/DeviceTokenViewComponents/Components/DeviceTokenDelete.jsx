import './DeviceTokenStyle.css';

function DeviceTokenDelete({tokenId, setUpdateDeviceTokenList, setSelectedRecord}){
    const URL = 'http://localhost:8080/api/devices-tokens/' + tokenId;
    
    const deleteDeviceToken = () => {
        fetch(URL, {method:'DELETE'})
            .then(response => setUpdateDeviceTokenList(true))
            .then(()=>setSelectedRecord(null))
            .catch(error=>console.error());
    }

    return (
        <> 
            <button className = "redButton" onClick={deleteDeviceToken}>DELETE</button>
        </>
    )
}

export default DeviceTokenDelete;