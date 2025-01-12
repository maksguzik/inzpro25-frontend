import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";
import TopBar from "./rootComponents/TopBar";
import "./Root.css";
import { useState } from "react";
import TabBar from "./rootComponents/TabBar";

function RootLayout({isAdmin, isUser, isSupportTeam}) {
  const [activeTab, setActiveTab] = useState("/");
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);
 
  const toggleMenu = () => {
    setIsMenuMinimized((prevState) => !prevState);
  };

  return (
    <div className="root-layout">
      {/* <TopBar isUser={isUser}
      /> */}
      <div className="container">
        <div className={`${isMenuMinimized ? "menu-minimized" : "menu"}`}>
          <MenuNav setActiveTab={setActiveTab} toggleMenuRoot={toggleMenu} isAdmin={isAdmin}
            isUser={isUser} isSupportTeam={isSupportTeam}
          />
        </div>
        <div className="content">
          <TabBar activeTab={activeTab} isUser={isUser} />
          <div className="outlet-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
