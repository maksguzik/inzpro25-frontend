import { useState, useEffect } from "react";
import "./DevicesState.css";

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
  {
    name: "Smartbox 4",
    devices: [
      { id: "device-4-1", name: "Device 4-1", status: "active" },
      { id: "device-4-2", name: "Device 4-2", status: "inactive" },
      { id: "device-4-3", name: "Device 4-3", status: "active" },
      { id: "device-4-4", name: "Device 4-4", status: "inactive" },
    ],
  },
  {
    name: "Smartbox 5",
    devices: [
      { id: "device-5-1", name: "Device 5-1", status: "active" },
      { id: "device-5-2", name: "Device 5-2", status: "inactive" },
      { id: "device-5-3", name: "Device 5-3", status: "active" },
      { id: "device-5-4", name: "Device 5-4", status: "inactive" },
    ],
  },
];

const initialAlertSettings = {
  title: "",
  type: "scheduled",
  frequency: 1,
  frequencyUnit: "Day",
  importance: "Medium",
  triggerOption: "One for each instance",
  offlineThreshold: 1,
  email: "",
};

const Smartbox = ({ data, onDeviceSelect, selectedDevices }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (device) => {
    onDeviceSelect(device);
  };

  const handleSelectAll = () => {
    const allSelected = data.devices.every((device) =>
      selectedDevices.some((d) => d.id === device.id)
    );

    if (allSelected) {
      // Odznacz wszystkie urządzenia
      data.devices.forEach((device) => onDeviceSelect(device));
    } else {
      // Zaznacz wszystkie urządzenia
      data.devices
        .filter((device) => !selectedDevices.some((d) => d.id === device.id))
        .forEach((device) => onDeviceSelect(device));
    }
  };

  const isSelected = (deviceId) =>
    selectedDevices.some((d) => d.id === deviceId);

  const areAllSelected = data.devices.every((device) =>
    selectedDevices.some((d) => d.id === device.id)
  );

  return (
    <div style={styles.smartboxContainer}>
      <div style={styles.smartboxHeader}>
        <input
          type="checkbox"
          checked={areAllSelected}
          onChange={(e) => {
            e.stopPropagation(); // Zatrzymanie kliknięcia w checkbox
            handleSelectAll();
          }}
          title="Select All Devices"
          style={styles.selectAllCheckbox}
        />
        <h2 onClick={toggleOpen} style={styles.smartboxTitle}>
          {data.name}
        </h2>
        <span onClick={toggleOpen} style={styles.toggleIcon}>
          {isOpen ? "-" : "+"}
        </span>
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
                  backgroundColor: isSelected(device.id)
                    ? "#e0f7fa"
                    : "transparent",
                  cursor: "pointer",
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
  const [error, setError] = useState("");
  const [showClearPopup, setShowClearPopup] = useState(false);

  const handleClearSelection = () => {
    setSelectedDevices([]); // Czyści zaznaczone urządzenia
    setShowClearPopup(false); // Zamknij popup
  };

  const handleCancelClear = () => {
    setShowClearPopup(false); // Zamknij popup bez czyszczenia
  };

  const filteredSmartboxes = smartboxesData.filter(
    (smartbox) =>
      smartbox.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      smartbox.devices.some((device) =>
        device.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  useEffect(() => {
    if (searchTerm.trim() && filteredSmartboxes.length === 0) {
      setError("No results found for your search.");
    } else {
      setError(""); // Reset błędu, jeśli coś znaleziono lub brak wyszukiwania
    }
  }, [searchTerm, filteredSmartboxes]);

  const handleDeviceSelect = (device) => {
    setSelectedDevices((prevSelected) => {
      const isAlreadySelected = prevSelected.some((d) => d.id === device.id);

      if (isAlreadySelected) {
        return prevSelected.filter((d) => d.id !== device.id);
      } else {
        const parentSmartbox = smartboxesData.find((smartbox) =>
          smartbox.devices.some((d) => d.id === device.id)
        );
        return [
          ...prevSelected,
          { ...device, smartbox: parentSmartbox ? parentSmartbox.name : null },
        ];
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

  const handleSelectAllFiltered = () => {
    if (!searchTerm.trim()) {
      // Jeśli `searchTerm` jest pusty lub zawiera tylko spacje, nie wykonuj akcji
      return;
    }
    const matchedDevicesByDeviceId = filteredSmartboxes.flatMap((smartbox) =>
      smartbox.devices
        .filter((device) =>
          device.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((device) => ({ ...device, smartbox: smartbox.name }))
    );

    const matchedDevicesBySmartboxName = filteredSmartboxes.flatMap(
      (smartbox) =>
        smartbox.name.toLowerCase().includes(searchTerm.toLowerCase())
          ? smartbox.devices.map((device) => ({
              ...device,
              smartbox: smartbox.name,
            }))
          : []
    );

    const allMatchedDevices = [
      ...matchedDevicesByDeviceId,
      ...matchedDevicesBySmartboxName,
    ];

    const uniqueMatchedDevices = Array.from(
      new Map(allMatchedDevices.map((device) => [device.id, device])).values()
    );

    setSelectedDevices((prevSelected) => {
      const newSelection = uniqueMatchedDevices.filter(
        (device) => !prevSelected.some((d) => d.id === device.id)
      );
      return [...prevSelected, ...newSelection];
    });
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Smartbox/Device"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button
          onClick={handleSelectAllFiltered}
          style={{
            ...styles.button,
            // opacity: searchTerm.trim() ? 1 : 0.5,
            // cursor: searchTerm.trim() ? "pointer" : "not-allowed",
          }}
          disabled={!searchTerm.trim()}
        >
          Select All Matching
        </button>
        <button onClick={() => setShowClearPopup(true)} style={styles.button}>
          Clear Selection
        </button>
        <button
          onClick={handleShowAlertPopup}
          style={{
            ...styles.button,
            opacity: selectedDevices.length > 0 ? 1 : 0.5, // Przyciemnienie przycisku, jeśli jest nieaktywny
            cursor: selectedDevices.length > 0 ? "pointer" : "not-allowed", // Zmiana kursora
          }}
          disabled={selectedDevices.length === 0} // Wyłączenie przycisku, jeśli brak wybranych urządzeń
        >
          Create Alert on Selected Devices
        </button>
      </div>

      {/* Popup do potwierdzenia czyszczenia */}
      {showClearPopup && (
        <div style={styles.popupOverlayClearSection}>
          <div style={styles.popupClearSection}>
            <p>Are you sure you want to clear all selected records?</p>
            <div style={styles.popupButtons}>
              <button onClick={handleCancelClear} style={styles.cancelButton}>
                No, cancel
              </button>
              <button
                onClick={handleClearSelection}
                style={styles.confirmButton}
              >
                Yes, clear
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p style={styles.errorText}>{error}</p>}

      <div className="smartboxes-container">
        {filteredSmartboxes.map((smartbox, index) => (
          <Smartbox
            key={index}
            data={smartbox}
            onDeviceSelect={handleDeviceSelect}
            selectedDevices={selectedDevices}
          />
        ))}
      </div>

      {showAlertPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <button
              onClick={handleCloseAlertPopup}
              style={styles.abandonButton}
            >
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
  //TODO: nie działa dobrze przy minimalizacji strony
  appContainer: {
    padding: "20px",
    flexDirection: "column",
    gap: "10px",
    height: "84vh",
  },
  popupOverlayClearSection: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupClearSection: {
    backgroundColor: "#fff",
    padding: "20px", // Zmniejszenie paddingu
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px", // Zmniejszenie szerokości
    minHeight: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Zachowanie przestrzeni między elementami
  },
  popupButtons: {
    display: "flex",
    justifyContent: "space-between", // Rozmieszczenie przycisków na przeciwległych końcach
    marginTop: "10px",
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: "0 0 auto", // Ustawienie szerokości przycisku na auto
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: "0 0 auto", // Ustawienie szerokości przycisku na auto
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
    fontWeight: "bold",
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
    width: "400px",
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
    marginBottom: "5px",
  },
  smartboxHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ccc",
    cursor: "pointer",
  },
  smartboxTitle: {
    margin: "0 10px",
    flexGrow: 1,
    cursor: "pointer",
  },
  selectAllCheckbox: {
    marginRight: "10px",
    cursor: "pointer",
  },
  toggleIcon: {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  },
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
    minWidth: "190px",
    fontSize: "15px",
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
