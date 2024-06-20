import { useState } from "react";
import './CompanyComponentStyle.css';

function UpdateCompany({companyId, setUpdateCompanyList}){
    
    const [companyName, setCompanyName] = useState("");
    // const [newCompanyId, setNewCompanyId] = useState(0);
    const [popup, setPopup] = useState(false);

    const URL = 'http://localhost:8080/api/companies/' + companyId;
    
    const updateCompany = () => {
        fetch(URL, {
                    method: 'PUT',
                    headers : { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({
                        "id": companyId,
                        "name" : companyName
                    })    
                    })
            .then(response => setUpdateCompanyList(true))
            .then(()=>setCompanyName(""))
            .then(()=>setPopup(false))
            .catch(error=>console.error());
    }

    const handleCompanyNameChange = (event) =>{
        event.preventDefault();
        setCompanyName(event.target.value);
    }
    
    // const handleNewCompanyIdChange = (event) =>{
    //     event.preventDefault();
    //     setNewCompanyId(event.target.value);
    // }

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            updateCompany();
        }
    }

    const togglePopup = (event) =>{
        event.stopPropagation(); 
        setPopup(!popup);
    }

    return (
        <> 
                <button className = "crudButton blueButton" onClick = {togglePopup}>Edit</button>
                {popup && (
                    <div className="popup">
                    <div className="overlay"
                        onClick = {togglePopup}></div>
                    <div className="popup-content"  onClick={(event) => event.stopPropagation()}>
                        <div className="popup-label">New Company Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {companyName} 
                            onChange = {handleCompanyNameChange}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <button className = "crudButton blueButton saveButton"
                        onClick = {updateCompany}>UPDATE</button>
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                    </div>
                </div>
                )}
            </>
    )
}

export default UpdateCompany;