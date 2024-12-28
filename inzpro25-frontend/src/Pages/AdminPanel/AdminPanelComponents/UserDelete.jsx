import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


function UserDelete({userId, setUpdateUserList, getUserList}){


    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;
    const {getAccessTokenSilently} = useAuth0();

    const deleteUser = async() =>{

            const token = await getAccessTokenSilently();
            const response = await fetch(URL + "api/admin-panel/users/" + userId, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .catch(error => console.error('Error deleting user:', error));

              if(response.status === 204){
                await new Promise(resolve => setTimeout(resolve, 1000));
                setUpdateUserList(true);
              }
              // }else if(response.stauts === 202){
              //   await new Promise(resolve => setTimeout(resolve, 1000));
              // }

          }

    return(
        <>
          <button className="crudButton redButton" onClick={deleteUser}>DELETE</button>
        </>
    )
}

export default UserDelete;
