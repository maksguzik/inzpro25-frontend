import './DeviceComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceDelete({deviceIdDeleteList, setUpdateDeviceList}){
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const {getAccessTokenSilently} = useAuth0();

    const deleteDevice = async() => {
        for(const deviceId of deviceIdDeleteList){
            const token = await getAccessTokenSilently();
            const response  = await fetch(URL + 'api/devices/' + deviceId, {
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            if(String(response.status).at(0)!=='2'){
                alert("Failed to delete the device.");
            }
        }
        setUpdateDeviceList(true);
    }

    return (
        <> 
            <button className = "crudButton redButton" onClick={deleteDevice}>DELETE</button>
        </>
    )
}

export default DeviceDelete;