import Company from "./Company";
import { useState, useEffect } from "react";
import AddCompany from "./Components/AddCompany";
import CompanyDelete from "./Components/CompanyDelete";
import './CompanyStyle.css';
import '../LogUniversalViewStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function CompanyList(){
    const [companyList, setCompanyList] = useState([]);
    const [updateCompanyList, setUpdateCompanyList] = useState(true);
    const [companyIdDeleteList, setCompanyIdDeleteList] = useState([]);

    const {getAccessTokenSilently} = useAuth0();

    const URL = 'http://localhost:8080/api/companies';

    const getCompanyList = async() =>{
        const token = await getAccessTokenSilently();
        console.log(token);
        fetch(URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => setCompanyList(json.content))
        .then(()=>setUpdateCompanyList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (updateCompanyList) getCompanyList();
    });

    return(<>
        <div className = "deleteAddContainer">
            <AddCompany
            setUpdateCompanyList = {setUpdateCompanyList}
            />
            <div className="deleteToken">
                <CompanyDelete
                        companyIdDeleteList = {companyIdDeleteList}
                        setUpdateCompanyList = {setUpdateCompanyList}
                />
            </div> 
        </div>
        <div  className = "companyListContainer">
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Company name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {companyList.map((element, index) => (
                        <Company
                        key = {element.id}
                        index = {index}
                        companyId = {element.id} 
                        companyName = {element.name}
                        setUpdateCompanyList = {setUpdateCompanyList}
                        setCompanyIdDeleteList = {setCompanyIdDeleteList}
                        />
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default CompanyList;