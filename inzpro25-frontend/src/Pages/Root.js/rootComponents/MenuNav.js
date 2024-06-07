import { Link } from "react-router-dom";
import "./MenuNav.css";

function MenuNav() {
  return (
    <header>
      <div className="Logo">
        <p>LOGO</p>
      </div>
      <nav>
        <ul className="menu-top">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="Logs">Logs</Link>
          </li>
          <li>
            <Link to="Alerts">Alerts</Link>
          </li>
          <li>
            <Link to="Raports">Raports</Link>
          </li>
        </ul>
        <ul className="menu-bottom">
          <li>
            <Link to="Settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MenuNav;
