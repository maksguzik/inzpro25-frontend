import { Outlet } from "react-router-dom";


function AlertsPage() {
  const { getAccessTokenSilently } = useAuth0();



  return (
    <>
      <Outlet />
    </>
  );
}

export default AlertsPage;
