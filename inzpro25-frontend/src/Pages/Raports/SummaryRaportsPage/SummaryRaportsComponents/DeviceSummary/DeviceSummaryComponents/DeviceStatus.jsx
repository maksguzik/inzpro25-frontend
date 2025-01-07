import React, { useEffect, useState } from "react";
import "./DeviceStatus.css";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaBell,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import DeviceStatusPopUp from "./DeviceStatusPopUp";

const DeviceStatus = ({ deviceState, deviceId: deviceIdFromProps }) => {
  const { deviceId: deviceIdFromParams } = useParams();
  const deviceId = deviceIdFromProps || deviceIdFromParams;

  const { getAccessTokenSilently } = useAuth0();

  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    downTimeDetectionDuration: "",
    alarmDetectionDuration: "",
    shouldSendEmail: false,
  });


  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleSavePopup = async (values) => {
    setFormValues(values);
    const token = await getAccessTokenSilently();
    try {
      const response = await fetch("http://localhost:8080/alert/device-states", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([
          {
            deviceId: deviceId,
            downtimeDetectionDuration: values.downTimeDetectionDuration,
            alarmDetectionDuration: values.alarmDetectionDuration,
            shouldSendEmail: values.shouldSendEmail,
          },
        ]),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert("Update successful")
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating device state:", error);
    }
  };



  return (
    <div className="device-status-card">
      <div className="device-status-header-button">
        <h2 className="device-status-header">Device State</h2>
        <button
          className="crudButton greyButton paginationButton"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
      <div className="device-status-content">
        <div className="status-row">
          <span className="status-label">Device ID:</span>
          <span className="status-content">{deviceState.deviceId}</span>
        </div>
        <div className="status-row">
          <span className="status-label">Last Seen:</span>
          <span className="status-content">
            {new Date(deviceState.lastSeen).toLocaleString()}
          </span>
        </div>
        <div className="status-row">
          <span className="status-label">Downtime Detection:</span>
          <span className="status-content">
            {deviceState.downtimeDetectionDuration} minutes
          </span>
        </div>
        <div className="status-row">
          <span className="status-label">Alarm Trigger Time:</span>
          <span className="status-content">
            {deviceState.alarmDetectionDuration} minutes
          </span>
        </div>
        <div className="status-row">
          <span className="status-label">Send Mail:</span>
          <span className="status-content">
            <span className="status-text">
              {deviceState.shouldSendEmail ? "Yes" : "No"}
            </span>
            {deviceState.shouldSendEmail ? (
              <FaEnvelope className="icon success" title="Email Sent" />
            ) : (
              <FaTimesCircle className="icon inactive" title="Email Not Sent" />
            )}
          </span>
        </div>
        <div className="status-row">
          <span className="status-label">Is Alarm:</span>
          <span className="status-content">
            <span className="status-text">
              {deviceState.alarm ? "Yes" : "No"}
            </span>
            {deviceState.alarm ? (
              <FaBell className="icon active" title="Alarm Active" />
            ) : (
              <FaCheckCircle className="icon success" title="Alarm Inactive" />
            )}
          </span>
        </div>
        <div className="status-row">
          <span className="status-label">Is Down:</span>
          <span className="status-content">
            <span className="status-text">
              {deviceState.down ? "Yes" : "No"}
            </span>
            {deviceState.down ? (
              <FaTimesCircle className="icon inactive" title="Device Down" />
            ) : (
              <FaCheckCircle className="icon success" title="Device Active" />
            )}
          </span>
        </div>
      </div>
      <DeviceStatusPopUp
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSavePopup}
        initialValues={formValues}
      />
    </div>
  );
};

export default DeviceStatus;
