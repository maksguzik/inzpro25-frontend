import './DeviceComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceDelete({deviceIdDeleteList, setUpdateDeviceList}){
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const {getAccessTokenSilently} = useAuth0();

    const deleteDevice = async() => {
        for(const deviceId of deviceIdDeleteList){
            const token = await getAccessTokenSilently();
            fetch(URL + 'api/devices/' + deviceId, {
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
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