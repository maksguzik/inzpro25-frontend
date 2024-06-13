import CompanyDisplay from "./Components/CompanyDisplay";
import CompanyDelete from "./Components/CompanyDelete";
import UpdateCompany from "./Components/UpdateCompany";

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
                <UpdateCompany
                    companyId = {companyId}
                    setUpdateCompanyList = {setUpdateCompanyList}
                />
            </tr>
    );
}

export default Company;