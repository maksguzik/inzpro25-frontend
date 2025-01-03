import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";
import MenuNavUser from "./rootComponents/MenuNavUser";
import TopBar from "./rootComponents/TopBar";
import "./Root.css";
import { useState } from "react";
import TabBar from "./rootComponents/TabBar";

function RootLayout({isUser, isNotAdmin}) {
  const [activeTab, setActiveTab] = useState("/");
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);
 
  const toggleMenu = () => {
    setIsMenuMinimized((prevState) => !prevState);
  };

  return (
    <div className="root-layout">
      <TopBar 
      />
      <div className="container">
        <div className={`${isMenuMinimized ? "menu-minimized" : "menu"}`}>
          {(!isUser) ? (<MenuNav setActiveTab={setActiveTab} toggleMenuRoot={toggleMenu} isNotAdmin={isNotAdmin}/>) : 
            (<MenuNavUser setActiveTab={setActiveTab} toggleMenuRoot={toggleMenu} />)
          }
          
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
