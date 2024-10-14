import './CompanyComponentStyle.css';

function CompanyDelete({companyIdDeleteList, setUpdateCompanyList}){
    const URL = 'http://localhost:8080/api/companies/';
    
    const deleteCompany = () => {
        for(const companyId of companyIdDeleteList){
            fetch(URL + companyId, {method:'DELETE'})
                .then(response => setUpdateCompanyList(true))
                .catch(error=>console.error());
        } 
    }

    return (
        <> 
            <button className = "crudButton redButton" onClick={deleteCompany}>DELETE</button>
        </>
    )
}

export default CompanyDelete;