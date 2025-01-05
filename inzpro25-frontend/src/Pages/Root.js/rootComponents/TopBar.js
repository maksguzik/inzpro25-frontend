import "./Topbar.css";
import AccountSettings from "./TopBarComponents/AccountSettings";

function TopBar({isOnlyUser}) {

  return (
    <>
      <header className="header-top-bar">
        <div className="left-section">
          <div>Logo i nazwa</div>
        </div>
        <div className="right-section">
          <button className="actionButton">Notifications</button>
          <button className="actionButton">Triggered alarms</button>
          <AccountSettings isOnlyUser={isOnlyUser}
          />
        </div>
      </header>
    </>
  );
}

export default TopBar;
