import "./Topbar.css";
import { NavLink } from "react-router-dom";

const tabValues = {
  Home: ['General', 'Pinned'],
  Alerts: ['All', 'Active', 'Set off', 'History'],
  Logs: ['DeviceToken', 'DeviceType', 'Company'],
  Raports: ['To be named','To be named','To be named'],
  Settings: ['To be named','To be named','To be named'],
};




function TopBar({activeTab}) {
  const tabButtons = tabValues[activeTab] || [];


  return (
    <>
      <header className="header-top-bar">
        <div>
          <button className="action-button">Notifications</button>
          <button className="action-button">Triggered alarms</button>
          <button className="action-button">Account Settings</button>
        </div>
      </header>
      <header className="header-tab-bar">
      <div>
          {tabButtons.map((tabValue, index) => (
            <NavLink to={`${activeTab}/${tabValue}`} key={index} className="action-button">{tabValue}</NavLink>
          ))}
        </div>
      </header>
    </>
  );
}

            
export default TopBar;
