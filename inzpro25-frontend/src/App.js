import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import AllAlertsPage from "./Pages/Alerts/Tabs/AllAlertsPage";
import CreateNewAlarmPage from "./Pages/Alerts/Tabs/CreateNewAlarmPage";
import DevicesPage from "./Pages/Logs/Tabs/DevicesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "Alerts", element: <AlertsPage />,
        children: [
          {path: "All alerts", element: <AllAlertsPage />},
          {path: "Create new alarm", element: <CreateNewAlarmPage />}
        ]
      },
      {
        path: "Logs",
        element: <LogsPage />,
        children: [
          { path: "All logs", element: <DeviceLogPage /> },
          { path: "Devices", element: <DevicesPage />},
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
  {
    path: "/login",
    element: <LoginPage />,
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
