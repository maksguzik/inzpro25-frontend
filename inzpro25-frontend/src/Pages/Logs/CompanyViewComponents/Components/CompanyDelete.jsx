import './CompanyComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function CompanyDelete({companyIdDeleteList, setUpdateCompanyList}){
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();

    const deleteCompany = async() => {
        const token = await getAccessTokenSilently();
        for(const companyId of companyIdDeleteList){
            const response = await fetch(URL + 'api/companies/' + companyId, {
                method:'DELETE',
                headers : { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        if(String(response.status).at(0)!=='2'){
          alert("Failed to delete the device.");
        }
        } 
        setUpdateCompanyList(true);
    }

    return (
        <> 
            <button className = "crudButton redButton" onClick={deleteCompany}>DELETE</button>
        </>
    )
}

export default CompanyDelete;