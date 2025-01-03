import { useEffect, useRef, useState, useCallback } from "react";
import UserDisplay from "./UserDisplay";
import UserDelete from "./UserDelete";
import UserUpdate from "./UserUpdate";
import { useAuth0 } from "@auth0/auth0-react";

function User({userId, index, email, emailVerified, name, companies, setUpdateUserList, companyList}){

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const [hover, setHover] = useState(false);

    // const [selected, setSelected] = useState(false);
    const {getAccessTokenSilently} = useAuth0();
    const [roles, setRoles] = useState([]);
    const [updateRoles, setUpdateRoles] = useState(true);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);
    const rowRef = useRef(null);
    useEffect(() => {
        const row = rowRef.current;
        if (row) {
            row.addEventListener('mouseenter', handleMouseEnter);
            row.addEventListener('mouseleave', handleMouseLeave);
        }
        return () => {
            if (row) {
                row.removeEventListener('mouseenter', handleMouseEnter);
                row.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [rowRef]);

    
    const getUserRole = useCallback(async()=>{

        const token = await getAccessTokenSilently();
        
          const response = await fetch(URL + "api/admin-panel/users/" + userId + "/roles", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .catch(error=>console.error('Error fetching roles:', error));
          const data =  await response.json();
          
          if (response.ok) {
            // await new Promise(resolve => setTimeout(resolve, 1000));
            setRoles(data);
            setUpdateRoles(false);
          }
    },[getAccessTokenSilently, userId, setRoles, URL]);

    useEffect(()=>{
        if(updateRoles){
            getUserRole();
            setUpdateRoles(false);
        }
    }, [updateRoles, getUserRole])
    

    return(<tr
        className = {"deviceToken"}
        
        ref = {rowRef}
        >
        <UserDisplay
        userId = {userId}
        index = {index}
        email = {email} 
        emailVerified = {emailVerified}
        name = {name}
        companies = {companies}
        roles = {roles}
        />
        
        {(hover)?(
            <td>
                <UserDelete
                    userId = {userId}
                    setUpdateUserList = {setUpdateUserList}
                />
                <UserUpdate
                    userId={userId}
                    email={email}
                    name={name}
                    companyNames={companies}
                    roles={roles}
                    setUpdateUserList={setUpdateUserList}
                    setUpdateRoles={setUpdateRoles}
                    companyList={companyList}
                />
            </td>
        ):<td className = "noHoverDeleteToken"></td>}
        </tr>
    );

}

export default User;
