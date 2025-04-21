import React, { useState } from "react";
import "./DeviceStatusPopUp.css";

const DeviceStatusPopUp = ({ isOpen, onClose, onSave, initialValues }) => {
  const [downTimeDetectionDuration, setDownTimeDetectionDuration] = useState(
    initialValues.downTimeDetectionDuration
  );
  const [alarmDetectionDuration, setAlarmDetectionDuration] = useState(
    initialValues.alarmDetectionDuration
  );
  const [shouldSendEmail, setShouldSendEmail] = useState(
    initialValues.shouldSendEmail
  );

  const handleSave = () => {
    if (
      downTimeDetectionDuration === "" ||
      alarmDetectionDuration === "" ||
      downTimeDetectionDuration < 0 ||
      alarmDetectionDuration < 0
    ) {
      alert("Please enter valid positive numbers for all fields.");
      return;
    }

    onSave({
      downTimeDetectionDuration,
      alarmDetectionDuration,
      shouldSendEmail,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Edit Device Settings</h2>
        <div className="popup-form">
          <label>
            Downtime Detection Duration:
            <input
              type="number"
              value={downTimeDetectionDuration}
              onChange={(e) => {
                const value = e.target.value === "" ? "" : Number(e.target.value);
                if (value >= 0 || value === "") {
                  setDownTimeDetectionDuration(value);
                }
              }}
              min="0"
              placeholder="Enter duration"
            />
          </label>
          <label>
            Alarm Detection Duration:
            <input
              type="number"
              value={alarmDetectionDuration}
              onChange={(e) => {
                const value = e.target.value === "" ? "" : Number(e.target.value);
                if (value >= 0 || value === "") {
                  setAlarmDetectionDuration(value);
                }
              }}
              min="0"
              placeholder="Enter duration"
              style={{ width: "196px"}}
            />
          </label>
          <label className="checkbox-label">
          <span>Should Send Email:</span>
            <input
              type="checkbox"
              checked={shouldSendEmail}
              onChange={(e) => setShouldSendEmail(e.target.checked)}
            />
          </label>
        </div>
        <div className="popup-buttons">
          <button
            onClick={onClose}
            className="crudButton greyButton paginationButton"
            style={{ backgroundColor: "gray" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="crudButton greyButton paginationButton"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusPopUp;
