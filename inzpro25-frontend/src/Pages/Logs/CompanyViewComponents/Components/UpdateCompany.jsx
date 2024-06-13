import { useState } from "react";


function UpdateCompany({companyId, setUpdateCompanyList}){
    
    const [companyName, setCompanyName] = useState("company");
    const [newCompanyId, setNewCompanyId] = useState(0);

    const URL = 'http://localhost:8080/api/companies/' + companyId;
    
    const updateCompany = () => {
        fetch(URL, {
                    method: 'PUT',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({
                        "id": newCompanyId,
                        "name" : companyName
                    })    
                    })
            .then(response => setUpdateCompanyList(true))
            .then(()=>setCompanyName("company"))
            .then(()=>setNewCompanyId(0))
            .catch(error=>console.error());
    }

    const handleCompanyNameChange = (event) =>{
        event.preventDefault();
        setCompanyName(event.target.value);
    }
    
    const handleNewCompanyIdChange = (event) =>{
        event.preventDefault();
        setNewCompanyId(event.target.value);
    }

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            updateCompany();
        }
    }

    const handleClickButton = () =>{
        updateCompany();
    }

    return (
        <> 
            <button className = "greenButton" onClick = {handleClickButton}>UPDATE</button>
            <input 
                value = {newCompanyId} 
                onChange = {handleNewCompanyIdChange}
                onKeyDown = {handleKeyDown}>
            </input>
            <input 
                value = {companyName} 
                onChange = {handleCompanyNameChange}
                onKeyDown = {handleKeyDown}>
            </input>
        </>
    )
}

export default UpdateCompany;