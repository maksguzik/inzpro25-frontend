
function DeviceTokenDelete({tokenId, setUpdateDeviceTokenList}){
    const URL = 'http://localhost:8080/api/devices-tokens/' + tokenId;
    
    const deleteDeviceToken = () => {
        fetch(URL, {method:'DELETE'})
            .then(response => setUpdateDeviceTokenList(true))
            .catch(error=>console.error());
    }

    return (
        <> 
            <button onClick={deleteDeviceToken}>DELETE</button>
        </>
    )
}

export default DeviceTokenDelete;