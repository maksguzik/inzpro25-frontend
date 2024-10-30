import React from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
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
import LoginPage from "./Pages/Root.js/rootComponents/LoginPage";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/login",
      index : true,
      element: <LoginPage 
                  isLoggedIn = {isLoggedIn}
                  setIsLoggedIn = {setIsLoggedIn}  
                />,
    },
    {
          path: "/",
          element: isLoggedIn ? <RootLayout 
                                  isLoggedIn = {isLoggedIn}
                                  setIsLoggedIn = {setIsLoggedIn}
                                /> : <Navigate to="/login" replace />,
          children: [
            { index: true, element: <HomePage /> },
            { path: "Alerts", element: <AlertsPage /> },
            {
              path: "Logs",
              element: <LogsPage />,
              children: [
                { path: "All logs", element: <DeviceLogPage /> },
              ],
            },
            { path: "Raports", element: <RaportsPage /> },
            { path: "Settings", element: <SettingsPage /> },
            {
              path: "DeviceManagement",
              element: <DeviceManagement />,
              children: [
                { path: "Token", element: <DeviceTokenPage /> },
                { path: "Json template", element: <JsonTemplatePage /> },
                { path: "Owner", element: <CompanyPage /> },
                { path: "Device", element: <DeviceViewPage /> },
              ],
            },
          ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
