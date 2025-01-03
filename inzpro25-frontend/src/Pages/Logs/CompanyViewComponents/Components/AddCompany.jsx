import { useState } from "react";
import './CompanyComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function AddCompany({companyId, setUpdateCompanyList}){
    
    const [companyName, setCompanyName] = useState("");
    // const [companyId, setCompanyId] = useState(0);
    const [popup, setPopup] = useState(false);
    const URL = 'http://localhost:8080/api/companies';
    const {getAccessTokenSilently} = useAuth0();
    
    const addCompany = async() => {
        const token = await getAccessTokenSilently();
        fetch(URL, {
                    method: 'POST',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "id": companyId,
                        "name": companyName
                    })    
                    })
            .then(response => setUpdateCompanyList(true))
            .then(()=>setPopup(false))
            .then(()=>setCompanyName(""))
            .catch(error=>console.error());
    }

    const handleCompanyNameChange = (event) =>{
        event.preventDefault();
        setCompanyName(event.target.value);
    }

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            addCompany();
        }
    }

    const togglePopup = (event) =>{
        event.stopPropagation(); 
        setPopup(!popup);
    }

    return (
        <> 
                <div className="addToken">
                <button className = "crudButton greenButton" onClick = {togglePopup}>ADD</button>
                </div>
                
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
                        onClick = {addCompany}>SAVE</button>
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                    </div>
                </div>
                )}
            </>
    )
}

export default AddCompany;