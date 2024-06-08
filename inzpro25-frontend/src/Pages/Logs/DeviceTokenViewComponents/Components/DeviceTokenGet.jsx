import { useEffect } from 'react'

function DeviceTokenGet(props){
    const URL = 'http://localhost:8080/api/devices-tokens/' + props.tokenId;
    
    const getDeviceToken = () => {
        fetch(URL)
            .then(response => response.json())
            .then(json => props.setTokenData(
                json
            ))
            .catch(error => console.error(error));
            console.log(props.tokenData);
    };

    useEffect(() => {
        getDeviceToken();
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
            <button onClick={getDeviceToken}>GET</button>
            <input onChange={handleInputChange}></input>
        {/* </form> */}
        </>
    )
}

export default DeviceTokenGet;