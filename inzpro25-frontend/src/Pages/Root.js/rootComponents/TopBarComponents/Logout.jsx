import { useState } from "react";
import "./LogoutStyle.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


function Logout({isUser}){

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {logout} = useAuth0();
    const navigate = useNavigate();

    const URL = process.env.REACT_APP_BASE_URL;
    // const handleClickedButton = () =>{
    //     setIsPopupOpen(!isPopupOpen);
    // }

    // const handleRedirect = () => {
    //   navigate('/Profile');
    // };    

    return (
        <div className="LogoutContainer">
          <button className="actionButton" 
          onClick = {()=>{logout({ logoutParams: { returnTo: `${URL}login` } });localStorage.clear();
          }}>
        
          <i className="material-icons-outlined">logout</i>
          Logout
          </button>
        </div>
      );
    }
    
export default Logout;