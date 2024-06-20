import './CompanyComponentStyle.css';

function CompanyDeleteAll({companyIdDeleteList, setUpdateCompanyList}){
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
        <div className="deleteToken">
            <button className = "crudButton redButton" onClick={deleteCompany}>DELETE</button>
        </div>
        </>
    )
}

export default CompanyDeleteAll;