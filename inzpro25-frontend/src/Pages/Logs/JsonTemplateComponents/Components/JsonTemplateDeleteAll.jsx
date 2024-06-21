import './DeviceComponentStyle.css';

function JsonTemplateDeleteAll({deviceIdDeleteList, setUpdateDeviceList}){
    const URL = 'http://localhost:8080/api/device-types/';
    
    const deleteDevice = () => {
        for(const deviceTypeName of deviceIdDeleteList){
            fetch(URL + deviceTypeName, {method:'DELETE'})
                .then(response => setUpdateDeviceList(true))
                .catch(error=>console.error());
        } 
    }

    return (
        <> 
        <div className="deleteToken">
            <button className = "crudButton redButton" onClick={deleteDevice}>DELETE</button>
        </div>
        </>
    )
}

export default JsonTemplateDeleteAll;