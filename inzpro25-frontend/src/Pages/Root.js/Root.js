import { Outlet } from "react-router-dom";
import MenuNav from "./rootComponents/MenuNav";
import TopBar from "./rootComponents/TopBar";
import './Root.css';


function RootLayout() {
  return (
    <div class="container">
      <div class="menu">
        <MenuNav />
      </div>
      <div class = "content">
        <div class= "row">
        <TopBar />
        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
