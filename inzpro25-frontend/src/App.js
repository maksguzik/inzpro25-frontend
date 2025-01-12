import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuth0 } from "@auth0/auth0-react";
import DeviceSummary from "./Pages/Raports/SummaryRaportsPage/SummaryRaportsComponents/DeviceSummary/DeviceSummary";
import CompanySummary from "./Pages/Raports/CompanySummary/CompanySummary";
import AllAlerts from "./Pages/Alerts/AllAlerts/AllAlerts";
import Dashboard from "./Pages/Home/Dashboard/Dashboard";
import UserPage from "./Pages/UserDevices/UserPage";
import ProfilePage from "./Pages/Profile/ProfilePage";

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
              
              (
              <Route>
                  <Route path="home/dashboard" element={<Dashboard/>}/>                
              <Route path="alerts" element={<AlertsPage />}>
                <Route path="all-alerts" element={<AllAlerts/>}></Route>
              </Route>
              <Route path="logs" element={<LogsPage />}>
                <Route path="all-logs" element={<DeviceLogPage />} />
              </Route>
              <Route path="raports" element={<RaportsPage />}>
                <Route index element={<Navigate to="company-summary" replace />} />
                <Route path="device-summary" element={<DeviceSummary />} />
                <Route path="device-summary/:deviceId" element={<DeviceSummary />} />
                <Route path="company-summary" element={<CompanySummary />} />
              </Route>
              <Route path="settings" element={<SettingsPage />} />
              </Route>)}
              {
                (roles.includes('ADMIN')) && (
                  <Route path="device-management" element={<DeviceManagement />}>
                    <Route index element={<Navigate to="token" replace />} />
                    <Route path="token" element={<DeviceTokenPage />} />
                    <Route path="json-template" element={<JsonTemplatePage />} />
                    <Route path="owner" element={<CompanyPage />} />
                    <Route path="device" element={<DeviceViewPage />} />
                  </Route>
                )
              }
              {(roles.includes('ADMIN')) &&
              (<Route path="admin-panel" element={<AdminPanel/>}>
                  <Route path="user-management" element={<UserManagement/>}/>

              </Route>) }
            {
            roles.includes('USER') && (
              <Route path="profile" element={<ProfilePage/>}>
                <Route index element={<Navigate to="profile-details" replace />} />
                <Route path="profile-details" element={<Profile />} />
              </Route>
              )}
              {
                (roles.includes('USER')) && (
                  <Route path="my-devices" element={<UserPage/>}>
                    <Route index element={<Navigate to="all-devices" replace />} />
                    <Route path="all-devices" element={<UserDeviceList />} />
                  </Route>
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
