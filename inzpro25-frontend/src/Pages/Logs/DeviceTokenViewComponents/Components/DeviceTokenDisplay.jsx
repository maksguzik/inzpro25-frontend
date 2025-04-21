import React, { useState } from "react";

function DeviceTokenDisplay({ tokenId, token, deviceTypeName }) {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token).then(
      () => {
        alert("Token copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy token: ", err);
      }
    );
  };

  return (
    <>
      <td></td>
      <td>{tokenId}</td>
      <td
        title={token}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        
      >
        <span>{token.slice(0, 20) + "..."}</span>
        {hover ? (
          <>
            <div
              className="icon-only-button"
              onClick={(event) => {
                event.stopPropagation();
                copyToClipboard();
              }}
            >
              <i className="material-icons-outlined">content_copy</i>
            </div>
          </>
        ) : (
          <div
            className="icon-only-button"
            >
            <i className="material-icons-outlined">none</i>
            </div>
        )}
      </td>
      <td>{deviceTypeName}</td>
    </>
  );
}

export default DeviceTokenDisplay;
