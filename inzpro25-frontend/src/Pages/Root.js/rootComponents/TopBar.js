import "./Topbar.css";
import AccountSettings from "./TopBarComponents/AccountSettings";

function TopBar({isLoggedIn, setIsLoggedIn}) {

  return (
    <>
      <header className="header-top-bar">
        <div className="left-section">
          <div>Logo i nazwa</div>
        </div>
        <div className="right-section">
          <button className="action-button">Notifications</button>
          <button className="action-button">Triggered alarms</button>
          <AccountSettings
            isLoggedIn = {setIsLoggedIn}
            setIsLoggedIn = {setIsLoggedIn}
          />
        </div>
      </header>
    </>
  );
}

export default TopBar;
