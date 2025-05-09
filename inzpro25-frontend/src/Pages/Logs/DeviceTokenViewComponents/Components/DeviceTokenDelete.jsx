import './DeviceTokenStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceTokenDelete({tokenIdDeleteList, setUpdateDeviceTokenList}){
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();

    const deleteDeviceToken = async() => {
        for(const tokenId of tokenIdDeleteList){
            const token = await getAccessTokenSilently();
            const response = await fetch(URL + 'api/devices-tokens/' + tokenId, {
                method:'DELETE',
                headers : { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        if(String(response.status).at(0)!=='2'){
            alert("Failed to delete the device.");
        }
        } 
        setUpdateDeviceTokenList(true);
    }

    return (
        <> 
            <button className = "crudButton redButton" onClick={deleteDeviceToken}>DELETE</button>
        </>
    )
}

export default DeviceTokenDelete;