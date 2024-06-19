import "./Tabbar.css";
import { NavLink } from "react-router-dom";

const tabValues = {
  Home: ["General", "To be named"],
  Alerts: ["All", "Active", "Set off", "History"],
  Logs: ["All logs"],
  Raports: ["To be named", "To be named", "To be named"],
  Settings: ["To be named", "To be named", "To be named"],
  DeviceManagement: ["Token", "Json template", "Owner", "Device"],
};

function TabBar({ activeTab }) {
  const tabButtons = tabValues[activeTab] || [];

  return (
    <header className="header-tab-bar">
      <div>
        {tabButtons.map((tabValue, index) => (
          <NavLink
            to={`${activeTab}/${tabValue}`}
            key={index}
            className={({ isActive }) => {
              return isActive ? "tab-button active" : "tab-button";
            }}
          >
            {tabValue}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

export default TabBar;
