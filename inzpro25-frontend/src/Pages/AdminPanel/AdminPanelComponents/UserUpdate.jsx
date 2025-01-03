import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Select from "react-select";
import './UserManagementStyle.css';

function UserUpdate({userId, email, name, companyNames, roles, setUpdateUserList, setUpdateRoles, companyList}){


    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();

    const [userData, setUserData] = useState({
        email:email,
        name:name,
        companyNames:companyNames,
        roles:roles
    });
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const updateUser = async () => {
        setIsPopupOpen(false);
        const token = await getAccessTokenSilently();
          const response = await fetch(URL + "api/admin-panel/users/" + userId, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify(userData),
          })
          .catch(error=>console.error('Error updating user:', error));
          console.log(await response.json());
          
          if (response.ok) {
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setUpdateUserList(true);
            setUpdateRoles(true);
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
      <label className="popupLabel">Name</label>
      <input
        className="inputDeviceToken"
        value={userData.name}
        onChange={(event) => handleChange(event, "name")}
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
