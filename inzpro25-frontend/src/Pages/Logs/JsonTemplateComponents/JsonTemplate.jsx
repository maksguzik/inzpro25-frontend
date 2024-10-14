import JsonTemplateDisplay from "./Components/JsonTemplateDisplay";
import UpdateJsonTemplate from "./Components/UpdateJsonTemplate";
import JsonTemplateDelete from "./Components/JsonTemplateDelete";
import { useEffect, useRef, useState } from "react";

function JsonTemplate({deviceTypeName, idMapping, loggedAtMapping, lastSeenMapping, setUpdateDeviceList, setDeviceIdDeleteList}){

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);
    const rowRef = useRef(null);

    const handleClick = () =>{
        setSelected((prevSelected) => {
            const newSelected = !prevSelected;
    
            if (newSelected) {
                setDeviceIdDeleteList((prevList) => [...prevList, deviceTypeName]);
            } else {
                setDeviceIdDeleteList((prevList) =>
                    prevList.filter((element) => element !== deviceTypeName)
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
                        deviceTypeName = {deviceTypeName}
                        idMapping = {idMapping}
                        loggedAtMapping = {loggedAtMapping}
                        lastSeenMapping = {lastSeenMapping}
                        setUpdateDeviceList = {setUpdateDeviceList}
                    />
                    <JsonTemplateDelete
                        deviceIdDeleteList = {[deviceTypeName]}
                        setUpdateDeviceList = {setUpdateDeviceList}
                    />
                    </td>
                ):<div className = "noHoverDeleteToken"></div>}
            </tr>
    );
}

export default JsonTemplate;