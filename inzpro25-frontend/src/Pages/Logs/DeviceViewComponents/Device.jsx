import DeviceDisplay from "./Components/DeviceDisplay";
import './DeviceStyle.css';
import UpdateDevice from "./Components/UpdateDevice";
import DeviceDelete from "./Components/DeviceDelete";
import { useEffect, useRef, useState } from "react";

function Device({deviceId, deviceSerialNumber, deviceName, deviceType, deviceCompanyName, setUpdateDeviceList, setDeviceIdDeleteList}){

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);
    const rowRef = useRef(null);

    const handleClick = () =>{
        setSelected((prevSelected) => {
            const newSelected = !prevSelected;
    
            if (newSelected) {
                setDeviceIdDeleteList((prevList) => [...prevList, deviceId]);
            } else {
                setDeviceIdDeleteList((prevList) =>
                    prevList.filter((element) => element !== deviceId)
                );
            }
    
            return newSelected;
        });
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
            { /*<td>{index}</td>  TYLKO DO DEBUGU*/}
                <DeviceDisplay
                    deviceId = {deviceId}
                    deviceSerialNumber = {deviceSerialNumber}
                    deviceName = {deviceName}
                    deviceType = {deviceType}
                    deviceCompanyName = {deviceCompanyName}
                />
                {(hover)?(
                    <td>
                    <UpdateDevice
                        deviceId = {deviceId}
                        deviceSerialNumber = {deviceSerialNumber}
                        deviceName = {deviceName}
                        deviceType = {deviceType}
                        deviceCompanyName = {deviceCompanyName}
                        setUpdateDeviceList = {setUpdateDeviceList}
                        // setSelectedRecord = {setSelectedRecord}
                    />
                    <DeviceDelete
                        deviceIdDeleteList = {[deviceId]}
                        setUpdateDeviceList = {setUpdateDeviceList}
                    />
                    </td>
                ):<div className = "noHoverDeleteToken"></div>}
            </tr>
    );
}

export default Device;