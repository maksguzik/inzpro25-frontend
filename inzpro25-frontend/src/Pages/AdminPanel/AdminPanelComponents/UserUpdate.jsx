import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './UserManagementStyle.css';

function UserUpdate({userId, email, name, companyNames, roles, setUpdateUserList, setUpdateRoles}){


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
          console.log(userData);
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

    const handleChangeArray = (event, key) =>{
        event.preventDefault();
        setUserData((prevUserData)=>({
            ...prevUserData,
            [key]: [event.target.value],
        }));
    }

    return(
        <>
            <button className="crudButton blueButton" onClick={togglePopup}>UPDATE</button>
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
                        <div className="popup-label">Roles</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {userData.roles} 
                            onChange = {(event) => handleChangeArray(event, "roles")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <div className="popup-label">Company Names</div>
                        <input
                            className = "inputDeviceToken"  
                            value = {userData.companyNames} 
                            onChange = {(event) => handleChangeArray(event, "companyNames")}
                            onKeyDown = {handleKeyDown}>
                        </input>
                        <button className = "crudButton blueButton saveButton"
                        onClick = {updateUser}>SAVE</button>
                        <button className = "closeButton crudButton"
                        onClick = {togglePopup}>Close</button>
                    </div>
                </div>
                )}
        </>
    )
}

export default UserUpdate;
