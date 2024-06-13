import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/Home/Home";
import AlertsPage from "./Pages/Alerts/Alerts";
import LogsPage from "./Pages/Logs/Logs";
import RaportsPage from "./Pages/Raports/Raports";
import RootLayout from "./Pages/Root.js/Root";
import SettingsPage from "./Pages/Settings/Settings";
import DeviceTokenPage from "./Pages/Logs/Tabs/DeviceTokenPage";
import DeviceTypePage from "./Pages/Logs/Tabs/DeviceTypePage";
import DeviceLogPage from './Pages/Logs/Tabs/DeviceLogPage';
import './App.css';



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "Alerts", element: <AlertsPage /> },
      {
        path: "Logs",
        element: <LogsPage />,
        children: [
          { path: "DeviceToken", element: <DeviceTokenPage /> },
          { path: "DeviceType", element: <DeviceTypePage /> },
          { path: "DeviceLog", element: <DeviceLogPage />},
        ],
      },
      { path: "Raports", element: <RaportsPage /> },
      { path: "Settings", element: <SettingsPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;



