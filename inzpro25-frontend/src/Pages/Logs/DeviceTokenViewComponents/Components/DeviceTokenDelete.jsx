import './DeviceTokenStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceTokenDelete({tokenIdDeleteList, setUpdateDeviceTokenList, setSelectedRecord}){
    const URL = 'http://localhost:8080/api/devices-tokens/';
    const {getAccessTokenSilently} = useAuth0();

    const deleteDeviceToken = async() => {
        for(const tokenId of tokenIdDeleteList){
            const token = await getAccessTokenSilently();
            fetch(URL + tokenId, {
                method:'DELETE',
                headers : { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => setUpdateDeviceTokenList(true))
                // .then(()=>setSelectedRecord(null))
                .catch(error=>console.error());
        } 
    }

    return (
        <> 
            <button className = "crudButton redButton" onClick={deleteDeviceToken}>DELETE</button>
        </>
    )
}

export default DeviceTokenDelete;