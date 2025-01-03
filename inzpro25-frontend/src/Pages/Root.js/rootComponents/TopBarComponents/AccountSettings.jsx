import { useState } from "react";
import "./AccountSettingsStyle.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


function AccountSettings({isLoggedIn, setIsLoggedIn}){

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {logout, isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    const handleClickedButton = () =>{
        setIsPopupOpen(!isPopupOpen);
    }

    const handleLogoutClicked = () =>{
      setIsLoggedIn(false);
    }

    const handleRedirect = () => {
      navigate('/Profile');
    };    

    return (
        <div className="account-settings-container">
          <button className="action-button" onClick={handleClickedButton}>
            Account Settings
          </button>
          {isPopupOpen && (
            <div className="popupOverlayAccountSettings">
              <div className="popupContentAccountSettings">
                <button
                  className="buttonLogoutAccountSettings"
                  onClick = {()=>logout({ logoutParams: { returnTo: "http://localhost:3000/login" } })}
                > Logout</button>
                <button className="buttonLogoutAccountSettings" onClick={handleRedirect}>
                  Profile
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
    
export default AccountSettings;