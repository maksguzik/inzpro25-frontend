import { useEffect, useRef, useState } from "react";
import UserDisplay from "./UserDisplay";
import UserDelete from "./UserDelete";
import UserUpdate from "./UserUpdate";

function User({userId, index, email, emailVerified, name, companies, setUpdateUserList, getUserList}){

    const [hover, setHover] = useState(false);

    const [selected, setSelected] = useState(false);

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
        />
        
        {(hover)?(
            <td>
                <UserDelete
                    userId = {userId}
                    setUpdateUserList = {setUpdateUserList}
                    getUserList = {getUserList}
                />
                <UserUpdate
                    userId={userId}
                    email={email}
                    name={name}
                    companyNames={companies}
                    setUpdateUserList={setUpdateUserList}
                />
            </td>
        ):<div className = "noHoverDeleteToken"></div>}
        </tr>
    );

}

export default User;
