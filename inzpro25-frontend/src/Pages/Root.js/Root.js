import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";

function RootLayout() {
  return (
    <>
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', minWidth: '200px' }}> {/* MenuNav */}
        <MenuNav />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}> {/* Kontener dla TopBar i main */}
        <main className="centered-main" style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center', // Centrowanie poziome
          alignItems: 'center' // Centrowanie pionowe
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  </>

  );
}

export default RootLayout;
