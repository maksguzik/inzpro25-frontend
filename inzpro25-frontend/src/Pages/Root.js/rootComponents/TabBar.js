import "./Tabbar.css";
import { NavLink } from "react-router-dom";

const tabValues = {
  Home: ["Not working yet"],
  Alerts: ["All alerts", "Create new alarm"],
  Logs: ["All logs", "Devices"],
  Raports: ["Not working yet"],
  Settings: ["Not working yet"],
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
