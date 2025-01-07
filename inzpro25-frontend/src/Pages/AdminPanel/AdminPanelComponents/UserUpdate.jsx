import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Select from "react-select";
import './UserManagementStyle.css';

function UserUpdate({userId, email, name, companyNames, roles, setUpdateUserList, setUpdateRoles}){


    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();

    const [companyList, setCompanyList] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState(name.split(' ').at(0));
    const [lastName, setLastName] = useState(name.split(' ').at(1) || '');
    
    const [userData, setUserData] = useState({
        email:email,
        name:firstName + " " + lastName,
        companyNames:companyNames,
        roles:roles
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

    const updateUser = async () => {
        setIsPopupOpen(false);
        console.log(userData);
        const token = await getAccessTokenSilently();
          const response = await fetch(URL + "api/admin-panel/users/" + userId, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({
              email:userData.email,
              name:firstName + " " + lastName,
              companyNames:userData.companyNames,
              roles:userData.roles
            }),
          })
          .catch(error=>console.error('Error updating user:', error));
          const data = await response.json();
          console.log(data);
          if (String(response.status).at(0)!=='2') {
            alert("Something went wrong! Please check your input and try again.");
            setUpdateUserList(true);
          }
          if (response.ok) {
            // await new Promise(resolve => setTimeout(resolve, 2000));
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
            updateUser();
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
        <button className="crudButton blueButton" onClick={togglePopup}>UPDATE</button>
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
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <label className="popupLabel">Last Name</label>
      <input
        className="inputDeviceToken"
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}
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
          onClick={updateUser}
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

export default UserUpdate;
