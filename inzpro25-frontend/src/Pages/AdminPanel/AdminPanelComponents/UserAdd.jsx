import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Select from "react-select";
import './UserManagementStyle.css';

function UserAdd({setUpdateUserList, companyList}){


    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();

    const [userData, setUserData] = useState({
        email:"example123@gmail.com",
        name:"sigma",
        companyNames:["GreenTech Innovations"],
        roles:["ADMIN"]
    });
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const addUser = async () => {
        setIsPopupOpen(false);
        const token = await getAccessTokenSilently();

          const response = await fetch(URL + "api/admin-panel/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify(userData),
          })
          .catch(error=>console.error('Error adding user:', error));
          console.log(userData);
          console.log(await response.json());
          
          if (response.ok) {
            await new Promise(resolve => setTimeout(resolve, 3000));
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

    const handleChangeArray = (event, key) =>{
        event.preventDefault();
        setUserData((prevUserData)=>({
            ...prevUserData,
            [key]: [event.target.value],
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
            <div className="AddToken">
                <button className="crudButton greenButton" onClick={togglePopup}>ADD</button>
            </div>
            {isPopupOpen && (
                    <div className="popup">
                    <div className="overlay"
                        onClick = {togglePopup}></div>
                    <div className="popup-content addUser"  onClick={(event) => event.stopPropagation()}>
                        <div className="popup-label">Email</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {userData.email} 
                            onChange = {(event) => handleChange(event, "email")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">Name</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {userData.name} 
                            onChange = {(event) => handleChange(event, "name")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label roleLabel">Roles</div>
                        <Select
                            isMulti
                            options={rolesOptions}
                            value={rolesOptions.filter((option) =>
                                userData.roles.includes(option.value)
                            )}
                            onChange={handleRolesChange}
                            className="inputDeviceToken rolePadding"
                        />
                        <div className="popup-label">Company Names</div>
                        <Select
                            isMulti
                            options={companiesOptions}
                            value={companiesOptions.filter((option) =>
                                userData.companyNames.includes(option.value)
                            )}
                            onChange={handleCompaniesChange}
                            className="inputDeviceToken rolePadding"
                        />
                        <button className = "crudButton blueButton saveButton"
                        onClick = {addUser}>SAVE</button>
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                    </div>
                </div>
                )}
        </>
    )
}

export default UserAdd;
