
function DeleteDeviceType({name, setUpdateDeviceTypeList}){
    const URL = `http://localhost:8080/api/device-types/${name}`;
    
    const deleteDeviceToken = () => {
        fetch(URL, {method:'DELETE'})
            .then(response => setUpdateDeviceTypeList(true))
            .catch(error=>console.error());
    }

    return (
        <> 
            <button onClick={deleteDeviceToken}>DELETE</button>
        </>
    )
}

export default DeleteDeviceType;