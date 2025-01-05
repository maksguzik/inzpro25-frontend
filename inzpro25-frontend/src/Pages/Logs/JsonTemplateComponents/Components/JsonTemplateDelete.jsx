import './DeviceComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function JsonTemplateDelete({deviceIdDeleteList, setUpdateDeviceList}){
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const {getAccessTokenSilently} = useAuth0();

    const deleteDevice = async() => {
        const token = await getAccessTokenSilently();
        for(const deviceTypeName of deviceIdDeleteList){
            fetch(URL + 'api/device-types/' + deviceTypeName, {
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
            <button className = "crudButton redButton" onClick={deleteDevice}>DELETE</button>
        </>
    )
}

export default JsonTemplateDelete;