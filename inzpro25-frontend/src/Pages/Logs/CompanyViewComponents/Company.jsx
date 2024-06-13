import CompanyDisplay from "./Components/CompanyDisplay";
import CompanyDelete from "./Components/CompanyDelete";

function Company({companyId, companyName, setUpdateCompanyList}){

    return(<tr className = "company">
                <CompanyDisplay
                    companyId = {companyId}
                    companyName = {companyName}
                />
                <CompanyDelete
                    companyId = {companyId}
                    setUpdateCompanyList = {setUpdateCompanyList}
                />
            </tr>
    );
}

export default Company;