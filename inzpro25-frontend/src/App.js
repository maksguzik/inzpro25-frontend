import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import HomePage from "./Pages/Home/Home";
import AlertsPage from "./Pages/Alerts/Alerts";
import LogsPage from "./Pages/Logs/Logs";
import RaportsPage from "./Pages/Raports/Raports";
import RootLayout from "./Pages/Root.js/Root";
import SettingsPage from "./Pages/Settings/Settings";
import DeviceTokenPage from "./Pages/Logs/Tabs/DeviceTokenPage";
import JsonTemplatePage from "./Pages/Logs/Tabs/JsonTemplatePage";
import CompanyPage from "./Pages/Logs/Tabs/CompanyPage";
import "./App.css";
import DeviceViewPage from "./Pages/Logs/Tabs/DeviceViewPage";
import DeviceLogPage from "./Pages/Logs/Tabs/DeviceLogPage";
import DeviceManagement from "./Pages/DeviceManagement/DeviceManagement";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import UserManagement from "./Pages/AdminPanel/AdminPanelComponents/UserManagement";
import Profile from "./Pages/Profile/Profile";
import UserDeviceList from "./Pages/UserDevices/UserDeviceList";
import AllAlertsPage from "./Pages/Alerts/Tabs/AllAlertsPage";
import CreateNewAlarmPage from "./Pages/Alerts/Tabs/CreateNewAlarmPage";
import DevicesPage from "./Pages/Logs/Tabs/DevicesPage";
// import LoginPage from "./Pages/Root.js/rootComponents/LoginPage";
// import LoginButton from "./Pages/Root.js/rootComponents/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {loginWithRedirect, getAccessTokenSilently, isAuthenticated, isLoading, error } = useAuth0();
  
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isGetUserRoleFunctionCalled, setIsGetUserRoleFunctionCalled] = useState(false);

  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  
  const decodeJWT = (token) => {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT format");
    return JSON.parse(atob(parts[1]));
};

  const fetchPermissions = async () => {
      try {
          const token = await getAccessTokenSilently();
          const decodedToken = decodeJWT(token);
          const permissions = decodedToken.permissions || [];
          console.log(permissions);
          setRoles(permissions);
          setIsGetUserRoleFunctionCalled(true);
      } catch (error) {
          console.error("Error fetching permissions:", error);
      }
  };

  useEffect(()=>{
    if(!isGetUserRoleFunctionCalled){
      fetchPermissions();
    }
  },[isGetUserRoleFunctionCalled, fetchPermissions])

  if (error) {
    return <div>Error: {error.message}</div>;
  }else if (isLoading) {
    return <div>Loading...</div>;
  }else if(isAuthenticated){

    return(
    <Router>
      <Routes>
          <>
         
            <Route path="/" element={<RootLayout isAdmin={roles.includes('ADMIN')}
              isUser={roles.includes('USER')} isSupportTeam={roles.includes('SUPPORT_TEAM')}
            />}>
              <Route index element={<HomePage />} />
              {(roles.includes('SUPPORT_TEAM')) &&
              
              (<Route>
                <Route path="Alerts" element={<AlertsPage />} />
              <Route path="Logs" element={<LogsPage />}>
                <Route path="All logs" element={<DeviceLogPage />} />
              </Route>
              <Route path="Raports" element={<RaportsPage />} />
              <Route path="Settings" element={<SettingsPage />} />
              <Route path="DeviceManagement" element={<DeviceManagement />}>
                <Route path="Token" element={<DeviceTokenPage />} />
                <Route path="Json template" element={<JsonTemplatePage />} />
                <Route path="Owner" element={<CompanyPage />} />
                <Route path="Device" element={<DeviceViewPage />} />
              </Route>
              </Route>)}
              {(roles.includes('ADMIN')) &&
              (<Route path="AdminPanel" element={<AdminPanel/>}>
                  <Route path="UserManagement" element={<UserManagement/>}/>

              </Route>) }
            {
            roles.includes('USER') && (
              <Route path="Profile" element={<Profile/>}/>
              )}
              {
                !(roles.includes('ADMIN') || roles.includes('SUPPORT_TEAM')) && (
                  <Route path="Devices" element={<UserDeviceList/>}/>
                )
              }

            </Route>
            
          </>
      </Routes>
    </Router>
  );
  }else{
    loginWithRedirect();
  }
}

export default App;
