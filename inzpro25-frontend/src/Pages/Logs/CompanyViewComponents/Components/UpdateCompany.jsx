import { useState } from "react";
import './CompanyComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function UpdateCompany({companyId, companyName, setUpdateCompanyList}){
    
    const [newCompanyName, setNewCompanyName] = useState(companyName);
    const [popup, setPopup] = useState(false);
    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    
    const updateCompany = async() => {
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/companies/' + companyId, {
                    method: 'PUT',
                    headers : { 
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "id": companyId,
                        "name" : newCompanyName
                    })    
                    })
            .then(response => setUpdateCompanyList(true))
            .then(()=>setNewCompanyName(""))
            .then(()=>setPopup(false))
            .catch(error=>console.error());
    }

    const handleCompanyNameChange = (event) =>{
        event.preventDefault();
        setNewCompanyName(event.target.value);
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
                <button className = "crudButton blueButton margin" onClick = {togglePopup}>Edit</button>
                {popup && (
  <div className="popup fancyPopup">
    <div className="overlay" onClick={togglePopup}></div>
    <div
      className="popupContent"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="popupLabel">New Company Name</div>
      <input
        className="inputDeviceToken"
        value={newCompanyName}
        onChange={handleCompanyNameChange}
        onKeyDown={handleKeyDown}
      />
      <div className="buttonsContainer">
      <button
        className="crudButton blueButton saveButton"
        onClick={updateCompany}
      >
        SAVE
      </button>
      <button
        className="closeButton crudButton"
        onClick={togglePopup}
      >
        CLOSE
      </button>
      </div>
    </div>
  </div>
)}

            </>
    )
}

export default UpdateCompany;