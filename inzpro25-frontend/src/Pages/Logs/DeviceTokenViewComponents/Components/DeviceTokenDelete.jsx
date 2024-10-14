import './DeviceTokenStyle.css';

function DeviceTokenDelete({tokenIdDeleteList, setUpdateDeviceTokenList, setSelectedRecord}){
    const URL = 'http://localhost:8080/api/devices-tokens/';
    
    const deleteDeviceToken = () => {
        
        for(const tokenId of tokenIdDeleteList){
            fetch(URL + tokenId, {method:'DELETE'})
                .then(response => setUpdateDeviceTokenList(true))
                // .then(()=>setSelectedRecord(null))
                .catch(error=>console.error());
        } 
    }

    return (
        <> 
        {/* <div className="deleteToken"> */}
            <button className = "crudButton redButton" onClick={deleteDeviceToken}>DELETE</button>
        {/* </div> */}
        </>
    )
}

export default DeviceTokenDelete;