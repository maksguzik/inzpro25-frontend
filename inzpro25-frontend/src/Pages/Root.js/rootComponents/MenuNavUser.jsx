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
                to="Devices"
                className={({ isActive }) => {
                  if (isActive) setActiveTab("Devices");
                  return isActive ? "active" : undefined;
                }}
              >
                <i className="material-icons-outlined">content_paste_search</i>
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
          </ul>
        )}
      </nav>
    </header>
  );
}

export default MenuNav;
