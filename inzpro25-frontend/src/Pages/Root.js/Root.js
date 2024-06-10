import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";
import TopBar from "./rootComponents/TopBar";
import './Root.css';


function RootLayout() {
  return (
    <div className = "container">
      <div className = "menu">
        <MenuNav />
      </div>
      <div className = "content">
        <div className = "row">
        <TopBar />
        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
