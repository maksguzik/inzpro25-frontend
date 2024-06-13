

function CompanyDelete({companyId, setUpdateCompanyList, setSelectedRecord}){
    const URL = 'http://localhost:8080/api/companies/' + companyId;
    
    const deleteCompany = () => {
        fetch(URL, {method:'DELETE'})
            .then(response => setUpdateCompanyList(true))
            .then(()=>setSelectedRecord(null))
            .catch(error=>console.error());
    }

    return (
        <> 
            <button className = "redButton" onClick = {deleteCompany}>DELETE</button>
        </>
    )
}

export default CompanyDelete;