import { useEffect } from 'react'

function DeviceTokenDelete({tokenId}){
    const URL = 'http://localhost:8080/api/devices-tokens/' + tokenId;
    
    const deleteDeviceToken = () => {
        fetch(URL, {method:'DELETE'})
            .catch(error=>console.error());
    }

    

    return (
        <> 
            <button onClick={deleteDeviceToken}>DELETE</button>
        </>
    )
}

export default DeviceTokenDelete;