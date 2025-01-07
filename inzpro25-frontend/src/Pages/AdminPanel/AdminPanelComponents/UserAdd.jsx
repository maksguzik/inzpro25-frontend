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
        email:"example@example.com",
        firstName:"example",
        lastName:"example",
        companyNames:["GreenTech Innovations"],
        roles:["ADMIN"]
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

    const addUser = async () => {
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
      <label className="popupLabel">Email</label>
      <input
        className="inputDeviceToken"
        value={userData.email}
        onChange={(event) => handleChange(event, "email")}
        onKeyDown={handleKeyDown}
      />
      <label className="popupLabel">First Name</label>
      <input
        className="inputDeviceToken"
        value={userData.firstName}
        onChange={(event) => handleChange(event, "firstName")}
        onKeyDown={handleKeyDown}
      />
      <label className="popupLabel">Last Name</label>
      <input
        className="inputDeviceToken"
        value={userData.lastName}
        onChange={(event) => handleChange(event, "lastName")}
        onKeyDown={handleKeyDown}
      />
      <label className="popupLabel roleLabel">Roles</label>
      <Select
        isMulti
        options={rolesOptions}
        value={rolesOptions.filter((option) =>
          userData.roles.includes(option.value)
        )}
        onChange={handleRolesChange}
        className="inputDeviceToken rolePadding"
      />
      <label className="popupLabel">Company Names</label>
      <Select
        isMulti
        options={companiesOptions}
        value={companiesOptions.filter((option) =>
          userData.companyNames.includes(option.value)
        )}
        onChange={handleCompaniesChange}
        onInputChange={(inputValue) => {
          handleCompanyNameChange(inputValue) }}
        className="inputDeviceToken rolePadding"
      />
      <div className="buttonsContainer">
        <button
          className="crudButton blueButton saveButton"
          onClick={addUser}
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

export default UserAdd;
