import React from "react";

const DeviceStatus = ({ deviceState }) => {
  return (
    <div className="device-details">
      <h2>Device State</h2>
      <ul>
        <li>
          <strong>Device ID:</strong> {deviceState.deviceId}
        </li>
        <li>
          <strong>Last seen:</strong>{" "}
          {new Date(deviceState.lastSeen).toLocaleString()}
        </li>
        <li>
          <strong>Downtime detection activation:</strong>{" "}
          {deviceState.downtimeDetectionDuration} minut
        </li>
        <li>
          <strong>Alarm trigger time:</strong>{" "}
          {deviceState.alarmDetectionDuration} minut
        </li>
        <li>
          <strong>Sent mail:</strong>{" "}
          {deviceState.shouldSendEmail ? "Tak" : "Nie"}
        </li>
        <li>
          <strong>Alarm:</strong>{" "}
          {deviceState.alarm ? "Aktywny" : "Nieaktywny"}
        </li>
        <li>
          <strong>Inactive:</strong> {deviceState.down ? "Tak" : "Nie"}
        </li>
      </ul>
    </div>
  );
};

export default DeviceStatus;