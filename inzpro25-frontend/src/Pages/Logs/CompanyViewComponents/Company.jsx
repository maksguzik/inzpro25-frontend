import CompanyDisplay from "./Components/CompanyDisplay";
import './CompanyStyle.css';
import UpdateCompany from "./Components/UpdateCompany";
import CompanyDelete from "./Components/CompanyDelete";
import { useEffect, useRef, useState } from "react";

function Company({companyId, companyName, setUpdateCompanyList, setCompanyIdDeleteList}){

    const [selected, setSelected] = useState(false);
    const [hover, setHover] = useState(false);
    const rowRef = useRef(null);

    const handleClick = () =>{
        setSelected((prevSelected) => {
            const newSelected = !prevSelected;
    
            if (newSelected) {
                setCompanyIdDeleteList((prevList) => [...prevList, companyId]);
            } else {
                setCompanyIdDeleteList((prevList) =>
                    prevList.filter((element) => element !== companyId)
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
                <CompanyDisplay
                    companyId = {companyId}
                    companyName = {companyName}
                />
                {(hover)?(
                    <td>
                    <UpdateCompany
                        companyId = {companyId}
                        companyName = {companyName}
                        setUpdateCompanyList = {setUpdateCompanyList}
                    />
                    <CompanyDelete
                        companyIdDeleteList = {[companyId]}
                        setUpdateCompanyList = {setUpdateCompanyList}
                    />
                    </td>
                ):<div className = "noHoverDeleteToken"></div>}
            </tr>
    );
}

export default Company;