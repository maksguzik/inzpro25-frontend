import { NavLink } from "react-router-dom";
import "./MenuNav.css";

function MenuNav( {setActiveTab}) {

  return (
    <header className="header-menu">
      <div className="logo">
        <p>LOGO</p>
      </div>
      <nav>
        <ul className="menu-top">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                if (isActive) setActiveTab("Home");
                return isActive ? "active" : undefined;
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="Logs"
              className={({ isActive }) => {
                if (isActive) setActiveTab("Logs");
                return isActive ? "active" : undefined;
              }}
            >
              Logs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="Alerts"
              className={({ isActive }) => {
                if (isActive) setActiveTab("Alerts");
                return isActive ? "active" : undefined;
              }}
            >
              Alerts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="Raports"
              className={({ isActive }) => {
                if (isActive) setActiveTab("Raports");
                return isActive ? "active" : undefined;
              }}
            >
              Raports
            </NavLink>
          </li>
        </ul>
        <ul className="menu-bottom">
          <li>
            <NavLink
              to="Settings"
              className={({ isActive }) => {
                if (isActive) setActiveTab("Settings");
                return isActive ? "active" : undefined;
              }}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MenuNav;

