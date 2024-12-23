import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


function UserDelete({userId, setUpdateUserList}){


    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const [getAccessTokenSilently] = useAuth0();

    const deleteUser = async() =>{
        try{
            const token = await getAccessTokenSilently();
            const response = await fetch(URL + "api/admin-panel/users/" + userId, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        
              if (response.status === 204) {
                setUpdateUserList(true);
              } else {
                throw new Error("Failed to delete user");
              }
            } catch (error) {
              console.error("Error deleting user:", error);
            }
          };
    return(
        <>
          <button className="crudButton redButton" onClick={deleteUser}>DELETE</button>
        </>
    )
}

export default UserDelete;
