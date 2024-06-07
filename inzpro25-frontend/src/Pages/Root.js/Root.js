import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";

function RootLayout() {
  return (
    <>
      <MenuNav />
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default RootLayout;
