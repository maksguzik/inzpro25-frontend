import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import './ProfileStyle.css';

function Profile(){

    const {getAccessTokenSilently} = useAuth0();
    const [userData, setUserData] = useState({
        userId:"",
        name:"",
        nickname:"",
        pictureUrl:"",
        emailVerified:"",
        companies:[],
    });
    const [newPassword, setNewPassword] = useState("");
    const [passwordChangeStatus, setPasswordChangeStatus] = useState(null);

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getUserData = async () => {
        try {
        const token = await getAccessTokenSilently();
        
        const response = await fetch(URL + 'api/user/profile', {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type' : 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setUserData(data);
        } catch (err) {
        console.error("Error fetching user data:", err);
        }
    };

    const changePassword = async () => {
        try {
          const token = await getAccessTokenSilently();
          
          const response = await fetch(URL + "api/user/profile/change-password", {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword }),
          });
    
          if (response.ok) {
            setPasswordChangeStatus("Password changed successfully!");
            setNewPassword("");
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to change password.");
          }
        } catch (err) {
          console.error("Error changing password:", err);
          setPasswordChangeStatus("Error changing password: " + err.message);
        }
      };
    

    useEffect(() => {
        getUserData();
    }, []);
    return(
        <div className="profileContainer">
        <div className="profileCard">
            <h2 className="profileHeader">Your Profile</h2>

            <div className="profileAvatar">
            {userData.pictureUrl ? (
                <img
                src={userData.pictureUrl}
                alt="Profile"
                className="profileImage"
                />
            ) : (
                <div className="profileNoImage">No Photo</div>
            )}
            </div>

            <div className="profileSection">
            <div className="bold">Full Name:</div>
            <div>{userData.name || "No data available"}</div>
            </div>

            <div className="profileSection">
            <div className="bold">Nickname:</div>
            <div>{userData.nickname || "No data available"}</div>
            </div>

            <div className="profileSection">
            <div className="bold">Email Verified:</div>
            <div>{userData.emailVerified ? "Yes" : "No"}</div>
            </div>

            <div className="profileSection">
            <div className="bold">Companies:</div>
            <ul>
                {userData.companies && userData.companies.length > 0 ? (
                userData.companies.map((company, index) => (
                    <li key={index}>{company}</li>
                ))
                ) : (
                <li>No companies assigned</li>
                )}
            </ul>
            </div>

            <div className="profileSection">
            <div className="bold">Change Password:</div>
            <input
                type="password"
                className="passwordInput"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
            />
            <button
                className="crudButton greyButton changePasswordButton"
                onClick={changePassword}
            >
                Change Password
            </button>
            {passwordChangeStatus && (
                <div className="passwordChangeStatus">{passwordChangeStatus}</div>
            )}
            </div>
        </div>
    </div>
    );

}

export default Profile;
