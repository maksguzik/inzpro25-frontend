import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
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
// import LoginPage from "./Pages/Root.js/rootComponents/LoginPage";
// import LoginButton from "./Pages/Root.js/rootComponents/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {loginWithRedirect, getAccessTokenSilently, isAuthenticated, login, logout, user, isLoading, error } = useAuth0();
  
  const [token, setToken] = useState(null);

  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  
    const fetchToken = async () => {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: audience,
            scope: "read:messages",
          });
          setToken(accessToken);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
    };

   

  if (error) {
    return <div>Error: {error.message}</div>;
  }else if (isLoading) {
    return <div>Loading...</div>;
  }else if(isAuthenticated){

       
    fetchToken();
    
    


  // const router = createBrowserRouter([
  //   {
  //     path: "/login",
  //     index : true,
  //     element: <LoginButton setIsLoggedIn={setIsLoggedIn}/>
  //   },
  //   {
  //         path: "/",
  //         element: <RootLayout></RootLayout>,
  //         children: [
  //           { index: true, element: <HomePage /> },
  //           { path: "Alerts", element: <AlertsPage /> },
  //           {
  //             path: "Logs",
  //             element: <LogsPage />,
  //             children: [
  //               { path: "All logs", element: <DeviceLogPage /> },
  //             ],
  //           },
  //           { path: "Raports", element: <RaportsPage /> },
  //           { path: "Settings", element: <SettingsPage /> },
  //           {
  //             path: "DeviceManagement",
  //             element: <DeviceManagement />,
  //             children: [
  //               { path: "Token", element: <DeviceTokenPage /> },
  //               { path: "Json template", element: <JsonTemplatePage /> },
  //               { path: "Owner", element: <CompanyPage /> },
  //               { path: "Device", element: <DeviceViewPage /> },
  //             ],
  //           },
  //         ],
  //   },
  // ]);

  // return (
  //   <>
  //     <RouterProvider router={router} />
  //   </>
  return (
    <Router>
      <Routes>
          <>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
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
              {
                isAdmin && (<Route path="AdminPanel" element={<AdminPanel/>}>
                  <Route path="UserManagement" element={<UserManagement/>}>

                  </Route>

                </Route>)
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
