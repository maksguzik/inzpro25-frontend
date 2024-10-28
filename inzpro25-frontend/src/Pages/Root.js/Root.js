import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";
import TopBar from "./rootComponents/TopBar";
import "./Root.css";
import { useState } from "react";
import TabBar from "./rootComponents/TabBar";
import LoginPage from "./rootComponents/LoginPage";

function RootLayout() {
  const [activeTab, setActiveTab] = useState("/");
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const toggleMenu = () => {
    setIsMenuMinimized((prevState) => !prevState);
  };

  return (
    (isLoggedIn)? (<div className="root-layout">
      <TopBar />
      <div className="container">
        <div className={`${isMenuMinimized ? "menu-minimized" : "menu"}`}>
          <MenuNav setActiveTab={setActiveTab} toggleMenuRoot={toggleMenu} />
        </div>
        <div className="content">
          <TabBar activeTab={activeTab} />
          <div className="outlet-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>) : (<div className="root-layout">
      <LoginPage
        setIsLoggedIn = {setIsLoggedIn}
      />
    </div>
      
    )
  );
}

export default RootLayout;
