import { NavLink } from "react-router-dom";
import "./MenuNav.css";
import { useState } from "react";

function MenuNav({ setActiveTab , toggleMenuRoot}) {
  const [isShrinked, setIsShrinked] = useState(false);

  const toggleMenu = () => {
    setIsShrinked((prevState) => !prevState);
  };

  return (
    <header className="header-menu">
      <nav>
        <div className="icon-only-button-container" onClick={() => {toggleMenu(); toggleMenuRoot();}}>
          <div className="icon-only-button">
            <i className="material-icons-outlined">menu</i>
          </div>
        </div>
        {isShrinked ? (
          <ul className="menu-top-shrinked">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Home");
                  return isActive ? "active icon-button" : "icon-button";
                }}
              >
                <i className="material-icons-outlined">home</i>
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
                <i className="material-icons-outlined">content_paste_search</i>
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
                <i className="material-icons-outlined">notifications</i>
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
                <i className="material-icons-outlined">show_chart</i>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="DeviceManagement"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("DeviceManagement");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">schema</i>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="Settings"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Settings");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">settings</i>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="menu-top">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Home");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">home</i>
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
                <i className="material-icons-outlined">content_paste_search</i>
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
                <i className="material-icons-outlined">notifications</i>
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
                <i className="material-icons-outlined">show_chart</i>
                Raports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="DeviceManagement"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("DeviceManagement");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">schema</i>
                Device management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="Settings"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Settings");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">settings</i>
                Settings
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default MenuNav;
