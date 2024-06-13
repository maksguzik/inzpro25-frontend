
function DeviceTokenDisplay({tokenId, token, deviceTypeName}){

    // const [hover, setHover] = useState(false);

    // const onHover = () =>{
    //     setHover(true);
    // }

    // const onLeave = () => {
    //     setHover(false);
    //   }
    return(<>
            <td>{tokenId}</td>
            <td>
                    {token.slice(0,20) + '...'}
            </td>
            <td>{deviceTypeName}</td>
        </>
    )
}

export default DeviceTokenDisplay;