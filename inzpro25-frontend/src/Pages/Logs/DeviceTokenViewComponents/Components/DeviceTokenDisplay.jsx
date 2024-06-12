
function DeviceTokenDisplay({tokenId, token, deviceTypeName}){



    return(<div>
            <div>{tokenId}</div>
            <div>{token}</div>
            <div>{deviceTypeName}</div>
        </div>
    )
}

export default DeviceTokenDisplay;