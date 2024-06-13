
function DeleteDeviceType({name, setUpdateDeviceTypeList, setSelectedRecord}){
    const URL = `http://localhost:8080/api/device-types/${name}`;
    
    const deleteDeviceToken = () => {
        fetch(URL, {method:'DELETE'})
            .then(response => setUpdateDeviceTypeList(true))
            .then(()=>setSelectedRecord(null))
            .catch(error=>console.error());
           
    }

    return (
        <> 
            <button onClick={deleteDeviceToken}>DELETE</button>
        </>
    )
}

export default DeleteDeviceType;