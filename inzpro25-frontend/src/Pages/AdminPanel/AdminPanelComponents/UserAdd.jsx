import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Select from "react-select";
import './UserManagementStyle.css';

function UserAdd({setUpdateUserList}){

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();
    const [companyList, setCompanyList] = useState([]);
    const [companyName, setCompanyName] = useState("");

    const [userData, setUserData] = useState({
        email:"",
        firstName:"",
        lastName:"",
        companyNames:["GreenTech Innovations"],
        roles:["ADMIN"],
        errors: {},
    });
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const getCompanyList = async() =>{
      const token = await getAccessTokenSilently();
      fetch(URL + `api/companies?name=${companyName}&size=2`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      })
      .then(response => response.json())
      .then(json => {
        setCompanyList(json.content)

      })
      .catch(error => console.error(error));
  }

  const validateForm = () => {
    const errors = {};
    const { email, firstName, lastName, companyNames, roles } = userData;
  
    if (!email) errors.email = "Email is required.";
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (companyNames.length === 0) errors.companyNames = "At least one company must be selected.";
    if (roles.length === 0) errors.roles = "At least one role must be selected.";
  
    setUserData((prev) => ({ ...prev, errors })); 
    return Object.keys(errors).length === 0;
  };

    const addUser = async () => {
      if (!validateForm()) {
        return;
      }
        setIsPopupOpen(false);
        const token = await getAccessTokenSilently();
        console.log(userData)
          const response = await fetch(URL + "api/admin-panel/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: userData.email,
              name: userData.firstName + ' ' + userData.lastName,
              companyNames: userData.companyNames,
              roles: userData.roles,
          }),
          })
          if(String(response.status).at(0)!=='2'){
            alert("Something went wrong! Please check your input and try again.");
          }
          
          if (response.ok) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setUpdateUserList(true);
          }
      };
    
    const togglePopup = (event) =>{
        event.stopPropagation(); 
        setIsPopupOpen(!isPopupOpen);
        setUserData((prevUserData)=>({
            ...prevUserData,
            roles:['USER'],
            companyNames: [],
        }));
    }

    const handleKeyDown = (event) =>{
        if(event.key === 'Enter'){
            addUser();
        }
    }
    const handleChange = (event, key) =>{
        event.preventDefault();
        setUserData((prevUserData)=>({
            ...prevUserData,
            [key]: event.target.value,
        }));
    }

    const handleRolesChange = async(selectedOptions) => {
        const selectedRoles = selectedOptions.map((option) => option.value);
        setUserData((prevUserData) => ({
            ...prevUserData,
            roles: selectedRoles,
        }));
    };

    const handleCompaniesChange = (selectedOptions) => {
        const selectedCompanies = selectedOptions.map((option) => option.value);
        setUserData((prevUserData) => ({
            ...prevUserData,
            companyNames: selectedCompanies,
        }));
    };

    const handleCompanyNameChange = (value)=>{
      setCompanyName(value);
      getCompanyList();
    }

    const companiesOptions = companyList.map((company) => ({
        value: company.name,
        label: company.name,
    }));;

    const rolesOptions = [
        { value: "ADMIN", label: "Admin" },
        { value: "USER", label: "User" },
        { value: "SUPPORT_TEAM", label: "Support Team" },
    ];

    return(
        <>
<div className="addToken">
  <button className="crudButton greenButton" onClick={togglePopup}>
    ADD
  </button>
</div>
{isPopupOpen && (
  <div className="popup fancyPopup">
    <div className="overlay" onClick={togglePopup}></div>
    <div
      className="popupContent addUser fancyPopupContent"
      onClick={(event) => event.stopPropagation()}
    >
      <label className="popupLabel">Email:</label>
      <input
        className={`inputDeviceToken ${userData.errors.email ? "inputError" : ""}`}
        value={userData.email}
        onChange={(event) => handleChange(event, "email")}
        onKeyDown={handleKeyDown}
        placeholder="Enter email"
      />
      {userData.errors.email && <p className="errorText">{userData.errors.email}</p>}
      <label className="popupLabel">First Name:</label>
      <input
        className={`inputDeviceToken ${userData.errors.firstName ? "inputError" : ""}`}
        value={userData.firstName}
        onChange={(event) => handleChange(event, "firstName")}
        onKeyDown={handleKeyDown}
        placeholder="Enter first name"
      />
      {userData.errors.firstName && <p className="errorText">{userData.errors.firstName}</p>}
      <label className="popupLabel">Last Name:</label>
      <input
        className={`inputDeviceToken ${userData.errors.lastName ? "inputError" : ""}`}
        value={userData.lastName}
        onChange={(event) => handleChange(event, "lastName")}
        onKeyDown={handleKeyDown}
        placeholder="Enter last name"
      />
      {userData.errors.lastName && <p className="errorText">{userData.errors.lastName}</p>}
      <label className="popupLabel roleLabel">Roles:</label>
      <Select
        isMulti
        options={rolesOptions}
        value={rolesOptions.filter((option) =>
          userData.roles.includes(option.value)
        )}
        onChange={handleRolesChange}
        className={`inputDeviceToken rolePadding ${userData.errors.roles ? "inputError" : ""}`}
      />
      {userData.errors.roles && <p className="errorText">{userData.errors.roles}</p>}
      <label className="popupLabel">Company Names:</label>
      <Select
        isMulti
        options={companiesOptions}
        value={companiesOptions.filter((option) =>
          userData.companyNames.includes(option.value)
        )}
        onChange={handleCompaniesChange}
        onInputChange={(inputValue) => {
          handleCompanyNameChange(inputValue) }}
          className={`inputDeviceToken rolePadding ${userData.errors.companyNames ? "inputError" : ""}`}
      />
      {userData.errors.companyNames && (
      <p className="errorText">{userData.errors.companyNames}</p>)}
      <div className="buttonsContainer">
      <button
          className="closeButton crudButton"
          onClick={togglePopup}
        >
          CLOSE
        </button>
        <button
          className="crudButton blueButton saveButton"
          onClick={addUser}
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

export default UserAdd;
