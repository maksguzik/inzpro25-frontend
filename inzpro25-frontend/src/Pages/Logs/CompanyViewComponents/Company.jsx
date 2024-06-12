import CompanyDisplay from "./Components/CompanyDisplay";


function Company({companyId, companyName, setUpdateCompanyList}){

    return(<tr className = "company">
                <CompanyDisplay
                    companyId = {companyId}
                    companyName = {companyName}
                />
            </tr>
    );
}

export default Company;