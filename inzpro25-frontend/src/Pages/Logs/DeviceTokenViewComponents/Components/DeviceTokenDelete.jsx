import './DeviceTokenStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceTokenDelete({tokenIdDeleteList, setUpdateDeviceTokenList}){
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();

    const deleteDeviceToken = async() => {
        for(const tokenId of tokenIdDeleteList){
            const token = await getAccessTokenSilently();
            fetch(URL + 'api/devices-tokens/' + tokenId, {
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