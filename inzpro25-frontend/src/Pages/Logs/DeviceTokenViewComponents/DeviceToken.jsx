import DeviceTokenDisplay from "./Components/DeviceTokenDisplay";
import './DeviceTokenStyle.css';
import UpdateDeviceToken from "./Components/UpdateDeviceToken";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";
import { useEffect, useRef, useState } from "react";

function DeviceToken({index, tokenId, token, deviceTypeName, setUpdateDeviceTokenList, setTokenIdDeleteList}){

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);
    const rowRef = useRef(null);

    const handleClick = () =>{
        setSelected((prevSelected) => {
            const newSelected = !prevSelected;
    
            if (newSelected) {
                setTokenIdDeleteList((prevList) => [...prevList, tokenId]);
            } else {
                setTokenIdDeleteList((prevList) =>
                    prevList.filter((element) => element !== tokenId)
                );
            }
    
            return newSelected;
        });
        // setSelectedRecord({
        //     "id": tokenId,
        //     "token": token,
        //     "deviceTypeName": deviceTypeName,
        // });
    }

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    useEffect(() => {
        const row = rowRef.current;
        if (row) {
            row.addEventListener('mouseenter', handleMouseEnter);
            row.addEventListener('mouseleave', handleMouseLeave);
        }
        return () => {
            if (row) {
                row.removeEventListener('mouseenter', handleMouseEnter);
                row.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [rowRef]);

    return(<tr className = {(selected)? "deviceToken selected":"deviceToken"}
                onClick = { () => {handleClick();}}
                ref = {rowRef}
            >   
                <DeviceTokenDisplay
                    tokenId = {tokenId}
                    token = {token}
                    deviceTypeName = {deviceTypeName}
                />
                {(hover)?(
                    <td className = "editDeleteSpaceBetween">
                    <UpdateDeviceToken
                        tokenId = {tokenId}
                        deviceTypeName={deviceTypeName}
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        // setSelectedRecord = {setSelectedRecord}
                    />
                    <DeviceTokenDelete
                        tokenIdDeleteList = {[tokenId]}
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        // setSelectedRecord = {setSelectedRecord}
                    />
                    </td>
                ):<td className = "noHoverDeleteToken"></td>}
            </tr>
    );
}

export default DeviceToken;