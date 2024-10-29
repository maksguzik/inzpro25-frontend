import { useState } from "react";

const smartboxesData = [
  {
    name: "Smartbox 1",
    devices: [
      { id: "device-1-1", name: "Device 1-1", status: "active" },
      { id: "device-1-2", name: "Device 1-2", status: "inactive" },
      { id: "device-1-3", name: "Device 1-3", status: "active" },
      { id: "device-1-4", name: "Device 1-4", status: "inactive" },
    ],
  },
  {
    name: "Smartbox 2",
    devices: [
      { id: "device-2-1", name: "Device 2-1", status: "inactive" },
      { id: "device-2-2", name: "Device 2-2", status: "active" },
      { id: "device-2-3", name: "Device 2-3", status: "active" },
      { id: "device-2-4", name: "Device 2-4", status: "inactive" },
    ],
  },
  {
    name: "Smartbox 3",
    devices: [
      { id: "device-3-1", name: "Device 3-1", status: "active" },
      { id: "device-3-2", name: "Device 3-2", status: "inactive" },
      { id: "device-3-3", name: "Device 3-3", status: "active" },
      { id: "device-3-4", name: "Device 3-4", status: "inactive" },
    ],
  },
];

const initialAlertSettings = {
    title: '',
    type: 'scheduled',
    frequency: 1,
    frequencyUnit: 'Day',
    importance: 'Medium',
    triggerOption: 'One for each instance',
    offlineThreshold: 1,
    email: ''
  };

  const Smartbox = ({ data, onDeviceSelect, selectedDevices }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSelect = (device) => {
      onDeviceSelect(device);
    };
  
    const isSelected = (deviceId) => selectedDevices.some((d) => d.id === deviceId);
  
    return (
      <div style={styles.smartboxContainer}>
        <div onClick={toggleOpen} style={styles.smartboxHeader}>
          <h2>{data.name}</h2>
          <span style={styles.toggleIcon}>{isOpen ? "-" : "+"}</span>
        </div>
        {isOpen && (
          <table style={styles.devicesTable}>
            <thead>
              <tr>
                <th>Select</th>
                <th>Device Name</th>
                <th>Device ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.devices.map((device) => (
                <tr
                  key={device.id}
                  onClick={() => handleSelect(device)}
                  style={{
                    backgroundColor: isSelected(device.id) ? "#e0f7fa" : "transparent",
                    cursor: "pointer"
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected(device.id)}
                      onChange={() => handleSelect(device)}
                      onClick={(e) => e.stopPropagation()} // Zatrzymanie propagacji, aby nie zaznaczać przy kliknięciu checkboxa
                    />
                  </td>
                  <td>{device.name}</td>
                  <td>{device.id}</td>
                  <td style={styles.statusCell}>
                    <span
                      style={{
                        ...styles.statusIndicator,
                        backgroundColor:
                          device.status === "active" ? "green" : "red",
                      }}
                    />
                    {device.status === "active" ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

function DevicesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [alertSettings, setAlertSettings] = useState(initialAlertSettings);

  const filteredSmartboxes = smartboxesData.filter((smartbox) =>
    smartbox.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeviceSelect = (device) => {
    setSelectedDevices((prevSelected) => {
      if (prevSelected.some((d) => d.id === device.id)) {
        return prevSelected.filter((d) => d.id !== device.id);
      } else {
        return [...prevSelected, device];
      }
    });
  };

  const handleShowAlertPopup = () => {
    setShowAlertPopup(true);
  };

  const handleCloseAlertPopup = () => {
    setShowAlertPopup(false);
    resetAlertSettings();
  };

  const resetAlertSettings = () => {
    setAlertSettings(initialAlertSettings);
  };

  const handleRunAlert = () => {
    console.log("Alert settings:", alertSettings);
    console.log("Selected devices:", selectedDevices);
    setShowAlertPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlertSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Smartbox..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleShowAlertPopup} style={styles.button}>
          Create Alert on Selected Devices
        </button>
        <button onClick={() => setSelectedDevices([])} style={styles.button}>
          Clear Selection
        </button>
      </div>

      {filteredSmartboxes.map((smartbox, index) => (
        <Smartbox
          key={index}
          data={smartbox}
          onDeviceSelect={handleDeviceSelect}
          selectedDevices={selectedDevices}
        />
      ))}
      {filteredSmartboxes.length === 0 && (
        <p style={styles.noResults}>No Smartboxes found.</p>
      )}

      {showAlertPopup && (
        <div style={styles.popupOverlay}>
           <div style={styles.popup}>
            <button onClick={handleCloseAlertPopup} style={styles.abandonButton}>
              Abandon Alert
            </button>
            <h2>Create Alert</h2>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={alertSettings.title}
                onChange={handleChange}
                style={styles.input}
              />
            </label>

            <div>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="scheduled"
                  checked={alertSettings.type === "scheduled"}
                  onChange={handleChange}
                />
                Scheduled
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="real-time"
                  checked={alertSettings.type === "real-time"}
                  onChange={handleChange}
                />
                Real-Time
              </label>
            </div>

            {alertSettings.type === "scheduled" && (
              <div style={styles.scheduledOptions}>
                <label style={styles.label}>Alarm activation every:</label>
                <input
                  type="number"
                  name="frequency"
                  value={alertSettings.frequency}
                  onChange={handleChange}
                  style={styles.input}
                />
                <select
                  name="frequencyUnit"
                  value={alertSettings.frequencyUnit}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Hour">Hour</option>
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                </select>
              </div>
            )}

            <label>
              Set Importance:
              <select
                name="importance"
                value={alertSettings.importance}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </label>

            <div style={styles.radioGroup}>
            <label style={styles.triggerLabel}>Trigger alarm:</label>
              <label>
                <input
                  type="radio"
                  name="triggerOption"
                  value="One for each instance"
                  checked={
                    alertSettings.triggerOption === "One for each instance"
                  }
                  onChange={handleChange}
                />
                One for each instance
              </label>
              <label>
                <input
                  type="radio"
                  name="triggerOption"
                  value="Only once"
                  checked={alertSettings.triggerOption === "Only once"}
                  onChange={handleChange}
                />
                Only once
              </label>
            </div>

            <label>
              When number of offline devices is greater than:
              <input
                type="number"
                name="offlineThreshold"
                value={alertSettings.offlineThreshold}
                onChange={handleChange}
                style={styles.input}
              />
            </label>

            <label>
              Send an email to:
              <input
                type="email"
                name="email"
                value={alertSettings.email}
                onChange={handleChange}
                style={styles.input}
              />
            </label>

            <button onClick={handleRunAlert} style={styles.button}>
              Run Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
    appContainer: {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        flex: 1,
        height: "100vh",
      },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
  },
  smartboxContainer: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
  },
  smartboxHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
  },
  toggleIcon: { fontSize: "24px", fontWeight: "bold" },
  devicesTable: { width: "100%", borderCollapse: "collapse" },
  statusCell: { display: "flex", alignItems: "center", gap: "8px" },
  statusIndicator: { width: "10px", height: "10px", borderRadius: "50%" },
  noResults: { color: "#888", fontStyle: "italic", marginTop: "10px" },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "relative",
  },
  abandonButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "14px",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    verticalAlign: "middle",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "14px",
    verticalAlign: "middle",
  },
  scheduledOptions: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  radioGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    minWidth: '190px',
    fontSize: '15px',
  },
  triggerLabel: {
    minWidth: "120px",
    fontSize: "15px",
    fontWeight: "normal",
  },
  popupSection: {
    marginBottom: "15px",
  },
};

export default DevicesList;
