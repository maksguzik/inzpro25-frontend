function DeleteAlert({deleteAlertList, setUpdateAlertsList, setAlertsList}){
    const URL = '';

    // const deleteAlert = () => {
    //     for (const alertId of deleteAlertList){
    //         fetch(URL + alertId, {method:'DELETE'})
    //         .then(response => setUpdateAlertsList(true))
    //         .catch(error => console.error());
    //     }
    // }

    const deleteAlert = () => {
        for (const alertId of deleteAlertList){
            setAlertsList(prevAlertsList => 
                prevAlertsList.filter(alert => !deleteAlertList.includes(alert.id))
            );
        }
        
    };


    return <>
        <button className = "crudButton redButton" onClick={deleteAlert}>Delete alert</button>
    </>
}

export default DeleteAlert