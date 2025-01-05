import { NavLink } from "react-router-dom";
import "./MenuNav.css";
import { useState } from "react";

function MenuNav({ setActiveTab , toggleMenuRoot, isAdmin, isUser, isSupportTeam}) {
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
            {isSupportTeam && (
              <>
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
            </>)}
            {isAdmin && (<li>
              <NavLink
                to="AdminPanel"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("AdminPanel");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">shield</i>
              </NavLink>
            </li>)}
            {isUser && !isAdmin && !isSupportTeam && (
              <>
            <li>
              <NavLink
                to="Devices"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Devices");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">content_paste_search</i>
                Devices
              </NavLink>
            </li>             
            <li>
              <NavLink
                to="Profile"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Profile");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">perm_identity</i>
              </NavLink>
            </li>
            </>
            )}
          </ul>
        ) : (
          <ul className="menu-top">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Home");
                  return isActive ? "active icon-button" : "icon-button";
                }}
              >
                <i className="material-icons-outlined">home</i>
                Home
              </NavLink>
            </li>
            {isSupportTeam && (
              <>
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
                Device Management
              </NavLink>
            </li>
            </>)}
            {isAdmin && (<li>
              <NavLink
                to="AdminPanel"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("AdminPanel");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">shield</i>
                Admin Panel
              </NavLink>
            </li>)}
            {isUser && !isAdmin && !isSupportTeam && (
              <>
            <li>
              <NavLink
                to="Devices"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Devices");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">content_paste_search</i>
                Devices
              </NavLink>
            </li>             
            <li>
              <NavLink
                to="Profile"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Profile");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">perm_identity</i>
                Profile
              </NavLink>
            </li>
            </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default MenuNav;
