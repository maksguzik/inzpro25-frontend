import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";
import TopBar from "./rootComponents/TopBar";
import './Root.css';
import { useState } from "react";


function RootLayout() {
  const [activeTab, setActiveTab] = useState('/');
  return (
    <div className = "container">
      <div className = "menu">
        <MenuNav setActiveTab={setActiveTab} />
      </div>
      <div className = "content">
        <div className = "row">
        <TopBar activeTab={activeTab}/>
        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;

