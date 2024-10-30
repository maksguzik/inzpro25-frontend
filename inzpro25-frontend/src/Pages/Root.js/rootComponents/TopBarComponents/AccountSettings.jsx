import { useState } from "react";
import "./AccountSettingsStyle.css";

function AccountSettings({isLoggedIn, setIsLoggedIn}){

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClickedButton = () =>{
        setIsPopupOpen(!isPopupOpen);
    }

    const handleLogoutClicked = () =>{
      setIsLoggedIn(false);
    }

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
                  onClick = {handleLogoutClicked}
                > Logout</button>
              </div>
            </div>
          )}
        </div>
      );
    }
    
export default AccountSettings;