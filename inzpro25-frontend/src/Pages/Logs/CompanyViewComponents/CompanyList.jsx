import Company from "./Company";
import { useState, useEffect } from "react";
import AddCompany from "./Components/AddCompany";
import './CompanyStyle.css';

function CompanyList(){
    const [companyList, setCompanyList] = useState([]);
    const [updateCompanyList, setUpdateCompanyList] = useState(true);

    const URL = 'http://localhost:8080/api/companies';

    const getCompanyList = () =>{
        fetch(URL)
        .then(response => response.json())
        .then(json => setCompanyList(json))
        .then(()=>setUpdateCompanyList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (updateCompanyList) getCompanyList();
    });

    return(
        <div  className = "companyListContainer">
            <AddCompany
            setUpdateCompanyList = {setUpdateCompanyList}
            />
            <table>
                <thead>
                    <tr>
                        <th>CompanyId</th>
                        <th>name</th>
                    </tr>
                </thead>
                <tbody>
                    {companyList.map((element) => (
                        <Company
                        companyId = {element.id} 
                        companyName = {element.name}
                        setUpdateCompanyList = {setUpdateCompanyList}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyList;