import { useState } from "react";
import './CompanyComponentStyle.css';

function AddCompany({setUpdateCompanyList}){
    
    const [companyName, setCompanyName] = useState("company");
    const [companyId, setCompanyId] = useState(0);
 
    const URL = 'http://localhost:8080/api/companies';
    
    const addCompany = () => {
        fetch(URL, {
                    method: 'POST',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({
                        "id": companyId,
                        "name": companyName
                    })    
                    })
            .then(response => setUpdateCompanyList(true))
            .then(()=>setCompanyName("company"))
            .then(()=>setCompanyId(0))
            .catch(error=>console.error());
    }

    const handleCompanyIdChange = (event) =>{
        event.preventDefault();
        setCompanyId(event.target.value);
    }

    const handleCompanyNameChange = (event) =>{
        event.preventDefault();
        setCompanyName(event.target.value);
    }

    return (
        <div className = "addCompany"> 
            <input 
                className = "inputAddCompany" 
                value = {companyId} 
                onChange = {handleCompanyIdChange}>
            </input>
            <input 
                className = "inputAddCompany" 
                value = {companyName} 
                onChange = {handleCompanyNameChange}>
            </input>
            <button 
                className = "greenButton" 
                onClick = {addCompany}>
                    ADD
            </button>
        </div>
    )
}

export default AddCompany;