import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/Home/Home";
import AlertsPage from "./Pages/Alerts/Alerts";
import LogsPage from "./Pages/Logs/Logs";
import RaportsPage from "./Pages/Raports/Raports";
import RootLayout from "./Pages/Root.js/Root";
import SettingsPage from "./Pages/Settings/Settings";
import './App.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "Alerts", element: <AlertsPage /> },
      { path: "Logs", element: <LogsPage /> },
      { path: "Raports", element: <RaportsPage /> },
      { path: "Settings", element: <SettingsPage />},
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



