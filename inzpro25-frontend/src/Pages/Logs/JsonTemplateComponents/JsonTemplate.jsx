import JsonTemplateDisplay from "./Components/JsonTemplateDisplay";
import UpdateJsonTemplate from "./Components/UpdateJsonTemplate";
import JsonTemplateDelete from "./Components/JsonTemplateDelete";
import { useEffect, useRef, useState } from "react";

function JsonTemplate({deviceId, deviceTypeName, idMapping, loggedAtMapping, lastSeenMapping, setUpdateDeviceList, setDeviceIdDeleteList}){

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
                <JsonTemplateDisplay
                    deviceTypeName = {deviceTypeName}
                    idMapping = {idMapping}
                    loggedAtMapping = {loggedAtMapping}
                    lastSeenMapping = {lastSeenMapping}
                />
                {(hover)?(
                    <td>
                    <UpdateJsonTemplate
                        deviceId={deviceId}
                        deviceTypeName = {deviceTypeName}
                        idMapping = {idMapping}
                        loggedAtMapping = {loggedAtMapping}
                        lastSeenMapping = {lastSeenMapping}
                        setUpdateDeviceList = {setUpdateDeviceList}
                    />
                    <JsonTemplateDelete
                        deviceIdDeleteList = {[deviceId]}
                        setUpdateDeviceList = {setUpdateDeviceList}
                    />
                    </td>
                ):<td className = "noHoverDeleteToken"></td>}
            </tr>
    );
}

export default JsonTemplate;