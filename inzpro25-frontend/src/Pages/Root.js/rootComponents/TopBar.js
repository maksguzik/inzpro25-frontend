import "./Topbar.css";
import Logout from "./TopBarComponents/Logout";

function TopBar({isUser}) {

  return (
    <>
      <header className="header-top-bar">
        <div className="left-section">
          <div>Logo i nazwa</div>
        </div>
        <div className="right-section">
          <button className="actionButton">Notifications</button>
          <button className="actionButton">Triggered alarms</button>
          <Logout isUser={isUser}
          />
        </div>
      </header>
    </>
  );
}

export default TopBar;
