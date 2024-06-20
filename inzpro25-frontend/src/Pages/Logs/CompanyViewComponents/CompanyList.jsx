import Company from "./Company";
import { useState, useEffect } from "react";
import AddCompany from "./Components/AddCompany";
import CompanyDeleteAll from "./Components/CompanyDeleteAll";
import './CompanyStyle.css';
import '../LogUniversalViewStyle.css';

function CompanyList(){
    const [companyList, setCompanyList] = useState([]);
    const [updateCompanyList, setUpdateCompanyList] = useState(true);
    const [companyIdDeleteList, setCompanyIdDeleteList] = useState([]);

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
            <div className = "deleteAddContainer">
                <AddCompany
                setUpdateCompanyList = {setUpdateCompanyList}
                />
                <CompanyDeleteAll
                            companyIdDeleteList = {companyIdDeleteList}
                            setUpdateCompanyList = {setUpdateCompanyList}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>CompanyId</th>
                        <th>name</th>
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
    );
}

export default CompanyList;