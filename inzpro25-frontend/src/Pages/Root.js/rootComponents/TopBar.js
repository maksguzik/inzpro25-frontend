import "./Topbar.css"; 

function TopBar() {
  return (
    <header className="header-top-bar">
      <div>
        <button className="action-button">Notifications</button>
        <button className="action-button">Triggered alarms</button>
        <button className="action-button">Account Settings</button>
      </div>
    </header>
  );
}

export default TopBar;
