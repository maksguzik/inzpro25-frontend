import './CompanyComponentStyle.css';

function CompanyDelete({companyId, setUpdateCompanyList}){
    const URL = 'http://localhost:8080/api/companies/' + companyId;
    
    const deleteCompany = () => {
        fetch(URL, {method:'DELETE'})
            .then(response => setUpdateCompanyList(true))
            .catch(error=>console.error());
    }

    return (
        <> 
            <button className = "crudButton redButton" onClick = {deleteCompany}>DELETE</button>
        </>
    )
}

export default CompanyDelete;