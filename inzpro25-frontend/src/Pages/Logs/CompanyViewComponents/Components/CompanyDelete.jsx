import './CompanyComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function CompanyDelete({companyIdDeleteList, setUpdateCompanyList}){
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();

    const deleteCompany = async() => {
        const token = await getAccessTokenSilently();
        for(const companyId of companyIdDeleteList){
            fetch(URL + 'api/companies/' + companyId, {
                method:'DELETE',
                headers : { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
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