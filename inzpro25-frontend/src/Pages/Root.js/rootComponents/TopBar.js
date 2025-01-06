import "./Topbar.css";
import AccountSettings from "./TopBarComponents/AccountSettings";

function TopBar({}) {

  return (
    <>
      <header className="header-top-bar">
        <div className="left-section">
          <div>TraceWave</div>
        </div>
        <div className="right-section">
          <AccountSettings
          />
        </div>
      </header>
    </>
  );
}

export default TopBar;
