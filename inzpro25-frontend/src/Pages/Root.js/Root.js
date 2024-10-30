import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";
import TopBar from "./rootComponents/TopBar";
import "./Root.css";
import { useState } from "react";
import TabBar from "./rootComponents/TabBar";

function RootLayout({isLoggedIn, setIsLoggedIn}) {
  const [activeTab, setActiveTab] = useState("/");
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);
 
  const toggleMenu = () => {
    setIsMenuMinimized((prevState) => !prevState);
  };

  return (
    <div className="root-layout">
      <TopBar 
        isLoggedIn = {isLoggedIn}
        setIsLoggedIn = {setIsLoggedIn}
      />
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
    </div>
  );
}

export default RootLayout;
