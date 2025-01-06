import "./Topbar.css";
import Logout from "./TopBarComponents/Logout";

function TopBar({isUser}) {

  return (
    <>
      <header className="header-top-bar">
        <div className="left-section">
          <div>TraceWave</div>
        </div>
        <div className="right-section">
          <Logout isUser={isUser}
          />
        </div>
      </header>
    </>
  );
}

export default TopBar;
