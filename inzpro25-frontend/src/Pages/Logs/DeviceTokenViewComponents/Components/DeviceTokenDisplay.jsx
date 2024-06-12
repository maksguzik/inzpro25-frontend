import './DeviceTokenStyle.css';
import { useState } from 'react';

function DeviceTokenDisplay({tokenId, token, deviceTypeName}){

    const [hover, setHover] = useState(false);

    const onHover = () =>{
        setHover(true);
    }

    const onLeave = () => {
        setHover(false);
      }
    return(<>
            <td>{tokenId}</td>
            <td 
                className = "truncatedText"
                onMouseEnter = {onHover}
                onMouseLeave = {onLeave}
                >
                    {token.slice(0,20) + '...'}
            </td>
            <td>{deviceTypeName}</td>
        </>
    )
}

export default DeviceTokenDisplay;