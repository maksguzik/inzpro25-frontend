import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './UserManagementStyle.css';

function UserDisplay({ userId, index, email, emailVerified, name, companies }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

  const getUserRole = async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const response = await fetch(URL + "api/admin-panel/users/" + userId + "/roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRoles(data);
      } else {
        alert('Something went wrong, please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShowRoles = async () => {
    setIsPopupOpen(true);
    await getUserRole();
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setRoles([]);
  };

  return (
    <>
      <td></td>
      <td>{userId}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{emailVerified ? "✔" : "✘"}</td>
      <td>{companies.join(", ")}</td>
      <td>
        <button className="crudButton greyButton resizeButton" onClick={handleShowRoles}>
          Show Roles
        </button>
      </td>


      {isPopupOpen && (
        <div className="popup fancyPopup">
          <div className="overlay" onClick={handleClosePopup}></div>
          <div
            className="popupContent fancyPopupContent"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>Roles for {name}</h3>
            {loading ? (
              <p>Loading roles...</p>
            ) : roles.length > 0 ? (
              <ul>
                {roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            ) : (
              <p>No roles found.</p>
            )}
            <div className="buttonsContainer">
              <button
                className="crudButton blueButton saveButton"
                onClick={handleClosePopup}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDisplay;
