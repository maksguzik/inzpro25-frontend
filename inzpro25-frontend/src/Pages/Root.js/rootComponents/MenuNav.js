import { NavLink } from "react-router-dom";
import "./MenuNav.css";
import { useState } from "react";
import tracewave_logo from "../../../assets/tracewave_logo.png";

function MenuNav({
  setActiveTab,
  toggleMenuRoot,
  isAdmin,
  isUser,
  isSupportTeam,
}) {
  const [isShrinked, setIsShrinked] = useState(false);

  const toggleMenu = () => {
    setIsShrinked((prevState) => !prevState);
  };

  return (
    <header className="header-menu">
      <nav>
        {!isShrinked ? (
          <div className="menu-logo-container">
          <img
            src={tracewave_logo}
            alt="Tracewave logo"
            style={{ width: "40px", height: "auto" }}
          />
          <h3 className="menu-nav-h3">TraceWave</h3>
        </div>
        ) : (
          <img
            src={tracewave_logo}
            alt="Tracewave logo"
            style={{ width: "50px", height: "auto", marginBottom: "5px" }}
          />
        )}
        <div
          className="icon-only-button-container"
          onClick={() => {
            toggleMenu();
            toggleMenuRoot();
          }}
        >
          <div className="icon-only-button">
            <i className="material-icons-outlined">menu</i>
          </div>
        </div>
        {isShrinked ? (
          <ul className="menu-top-shrinked">
            {isSupportTeam && (
              <li>
                <NavLink
                  to="/home/dashboard"
                  className={({ isActive }) => {
                    if (isActive) setActiveTab("Home");
                    return isActive ? "active icon-button" : "icon-button";
                  }}
                >
                  <i className="material-icons-outlined">home</i>
                </NavLink>
              </li>
            )}
            {isSupportTeam && (
              <>
                <li>
                  <NavLink
                    to="logs/all-logs"
                    className={({ isActive }) => {
                      if (isActive) setActiveTab("Logs");
                      return isActive ? "active" : undefined;
                    }}
                  >
                    <i className="material-icons-outlined">
                      content_paste_search
                    </i>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="alerts/all-alerts"
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
                    to="raports"
                    className={({ isActive }) => {
                      if (isActive) setActiveTab("Raports");
                      return isActive ? "active" : undefined;
                    }}
                  >
                    <i className="material-icons-outlined">show_chart</i>
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <NavLink
                  to="device-management"
                  className={({ isActive }) => {
                    if (isActive) setActiveTab("DeviceManagement");
                    return isActive ? "active" : undefined;
                  }}
                >
                  <i className="material-icons-outlined">schema</i>
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li>
                <NavLink
                  to="admin-panel/user-management"
                  className={({ isActive }) => {
                    if (isActive) setActiveTab("AdminPanel");
                    return isActive ? "active" : undefined;
                  }}
                >
                  <i className="material-icons-outlined">shield</i>
                </NavLink>
              </li>
            )}
            {isUser && (
              <>
                <li>
                  <NavLink
                    to="my-devices"
                    className={({ isActive }) => {
                      if (isActive) setActiveTab("Devices");
                      return isActive ? "active" : undefined;
                    }}
                  >
                    <i className="material-icons-outlined">devices</i>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="profile"
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
            {isSupportTeam && (
              <li>
                <NavLink
                  to="/home/dashboard"
                  className={({ isActive }) => {
                    if (isActive) setActiveTab("Home");
                    return isActive ? "active icon-button" : "icon-button";
                  }}
                >
                  <i className="material-icons-outlined">home</i>
                  Home
                </NavLink>
              </li>
            )}
            {isSupportTeam && (
              <>
                <li>
                  <NavLink
                    to="logs/all-logs"
                    className={({ isActive }) => {
                      if (isActive) setActiveTab("Logs");
                      return isActive ? "active" : undefined;
                    }}
                  >
                    <i className="material-icons-outlined">
                      content_paste_search
                    </i>
                    Logs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="alerts/all-alerts"
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
                    to="raports"
                    className={({ isActive }) => {
                      if (isActive) setActiveTab("Raports");
                      return isActive ? "active" : undefined;
                    }}
                  >
                    <i className="material-icons-outlined">show_chart</i>
                    Reports
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <NavLink
                  to="device-management"
                  className={({ isActive }) => {
                    if (isActive) setActiveTab("DeviceManagement");
                    return isActive ? "active" : undefined;
                  }}
                >
                  <i className="material-icons-outlined">schema</i>
                  Device Management
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li>
                <NavLink
                  to="admin-panel/user-management"
                  className={({ isActive }) => {
                    if (isActive) setActiveTab("AdminPanel");
                    return isActive ? "active" : undefined;
                  }}
                >
                  <i className="material-icons-outlined">shield</i>
                  Admin Panel
                </NavLink>
              </li>
            )}
            {isUser && (
              <>
                <li>
                  <NavLink
                    to="my-devices"
                    className={({ isActive }) => {
                      if (isActive) setActiveTab("Devices");
                      return isActive ? "active" : undefined;
                    }}
                  >
                    <i className="material-icons-outlined">devices</i>
                    My Devices
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="profile"
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
