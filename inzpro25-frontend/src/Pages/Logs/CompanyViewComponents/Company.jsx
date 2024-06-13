import CompanyDisplay from "./Components/CompanyDisplay";
import './CompanyStyle.css';

function Company({companyId, companyName, setSelectedRecord}){

    const handleClick = () =>{
        setSelectedRecord({
            "id": companyId,
            "name": companyName
        });
    }

    return(<tr className = "company"
                onClick = {handleClick}>
                <CompanyDisplay
                    companyId = {companyId}
                    companyName = {companyName}
                />
            </tr>
    );
}

export default Company;