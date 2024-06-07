import { useEffect } from 'react'

function DeviceTokenDelete(props){
    const URL = 'http://localhost:8080/api/devices-tokens/' + props.tokenId;
    
    const deleteDeviceToken = () => {
        fetch(URL, {method:'DELETE'})
            .then(()=>props.setTokenData('Delete successful'));
    }
    useEffect(() => {
        deleteDeviceToken();
    }, []);

    const handleInputChange = (event) =>{
        props.setTokenId(event.target.value);
    }
    // const handleButtonClick = (event) =>{
    //     props.setTokenData(event);
    // }

    return (
        <> 
        {/* <form> */}
            <button onClick={deleteDeviceToken}>DELETE</button>
            <input onChange={handleInputChange}></input>
        {/* </form> */}
        </>
    )
}

export default DeviceTokenDelete;