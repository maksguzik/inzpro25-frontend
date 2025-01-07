import { useState } from "react";
import "./LogoutStyle.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


function Logout({isUser}){

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {logout} = useAuth0();
    const navigate = useNavigate();

    // const handleClickedButton = () =>{
    //     setIsPopupOpen(!isPopupOpen);
    // }

    // const handleRedirect = () => {
    //   navigate('/Profile');
    // };    

    return (
        <div className="LogoutContainer">
          <button className="actionButton" 
          onClick = {()=>{logout({ logoutParams: { returnTo: "http://localhost:3000/login" } });localStorage.clear();
          }}>
            Logout
          </button>
          {/* {isPopupOpen && (
            <div className="popupOverlayLogout">
              <div className="popupContentLogout">
                <button
                  className="buttonLogoutLogout"
                  onClick = {()=>logout({ logoutParams: { returnTo: "http://localhost:3000/login" } })}
                > Logout</button>
                {isUser && (
                <button className="buttonLogoutLogout" onClick={handleRedirect}>
                  Profile
                </button>)}
              </div>
            </div>
          )} */}
        </div>
      );
    }
    
export default Logout;