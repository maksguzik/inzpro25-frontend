
import React, { useState } from 'react';

function DeviceTokenDisplay({ tokenId, token, deviceTypeName }) {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(true);
    };

    const onLeave = () => {
        setHover(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(token).then(() => {
            alert('Token copied to clipboard');
        }, (err) => {
            console.error('Failed to copy token: ', err);
        });
    };

    return (
        <>
            <td></td>
            <td>{tokenId}</td>
            <td
                title={token}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                style={{ cursor: "pointer", position: "relative" }}
            >
                <span>{token.slice(0, 20) + "..."}</span>
                {hover && (
                    <div
                        onClick={copyToClipboard}
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            padding: "2px 5px",
                            cursor: "pointer",
                        }}
                    >
                        Copy Token
                    </div>
                )}
            </td>
            <td>{deviceTypeName}</td>
        </>
    );
}

export default DeviceTokenDisplay;