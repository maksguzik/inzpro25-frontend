import "./Tabbar.css";
import { NavLink } from "react-router-dom";
import Logout from "./TopBarComponents/Logout";

const tabValues = {
  Home: ["Dashboard"],
  Alerts: ["All alerts"],
  Logs: ["All logs"],
  Raports: ["Company Summary", "Device Summary"],
  Settings: ["Not working yet"],
  DeviceManagement: ["Token", "Json template", "Owner", "Device"],
  AdminPanel: ["User Management"],
  Devices: ["All devices"],
  Profile: ["Profile details"],
};

const tabPathMap = {
  Home: "home",
  Alerts: "alerts",
  Logs: "logs",
  Raports: "raports",
  Settings: "settings",
  DeviceManagement: "device-management",
  AdminPanel: "admin-panel",
  Devices: "my-devices",
  Profile: "profile",
};

const getPath = (tabName) => tabPathMap[tabName] || tabName.toLowerCase();

function TabBar({ activeTab, isUser}) {
  const tabButtons = tabValues[activeTab] || [];

  return (
    <header className="header-tab-bar">
      <div className="tab-bar-logout-layout">
        <div>
          {tabButtons.map((tabValue, index) => (
            <NavLink
              to={`${getPath(activeTab)}/${tabValue
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              key={index}
              className={({ isActive }) => {
                return isActive ? "tab-button active" : "tab-button";
              }}
            >
              {tabValue}
            </NavLink>
          ))}
        </div>
        <Logout isUser={isUser}
          />
      </div>
    </header>
  );
}

export default TabBar;
