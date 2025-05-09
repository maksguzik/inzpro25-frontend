import { useState } from "react";
import './CompanyComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function AddCompany({companyId, setUpdateCompanyList}){
    
    const [companyName, setCompanyName] = useState("");
    // const [companyId, setCompanyId] = useState(0);
    const [popup, setPopup] = useState(false);
    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();
    const [error, setError] = useState("");
    
    const validateForm = () => {
      if (!companyName.trim()) {
          setError("Company name cannot be empty.");
          return false;
      }
      setError("");
      return true;
    };

    const addCompany = async() => {
      if (!validateForm()) {
        return; 
    }
        const token = await getAccessTokenSilently();
        const response = await fetch(URL + 'api/companies', {
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
        const responseData = await response.json();
        if(String(response.status).at(0)=='2'){
          setPopup(false);
          setUpdateCompanyList(true);
          setCompanyName("");
        }
        else{
          alert("Something went wrong! Please check your input and try again.");
        }
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
  <button className="crudButton greenButton" onClick={togglePopup}>
    ADD
  </button>
</div>

{popup && (
  <div className="popup fancyPopup">
    <div className="overlay" onClick={togglePopup}></div>
    <div
      className="popupContent"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="popupLabel">New Company Name:</div>
      <input
        className={`inputDeviceToken ${error ? "inputError" : ""}`}
        placeholder="Enter company name"
        value={companyName}
        onChange={handleCompanyNameChange}
        onKeyDown={handleKeyDown}
      />
      {error && <p className="errorText">{error}</p>}
      <div className="buttonsContainer">
      <button
        className="closeButton crudButton"
        onClick={togglePopup}
      >
        CLOSE
      </button>
      <button
        className="crudButton blueButton saveButton"
        onClick={addCompany}
      >
        SAVE
      </button>
      </div>
    </div>
  </div>
)}

            </>
    )
}

export default AddCompany;