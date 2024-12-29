import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import User from "./User";
import UserAdd from "./UserAdd";

function UserManagementTable(){


    const [userList, setUserList] = useState([]);
    const [updateUserList, setUpdateUserList] = useState(true);

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    // const getUserList = () =>{
    //     fetch(URL + "/api/admin-panel/users")
    //     .then(response => response.json())
    //     .then(json => setUserList(json))
    //     .then(()=>setUpdateUserList(false))
    //     .catch(error => console.error(error));
    // }
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const getUserList = async () => {
    try {
        const token = await getAccessTokenSilently();
        console.log(token);
        const response = await fetch(URL + "api/admin-panel/users?page=0", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setUserList(json);
        console.log(json);
        setUpdateUserList(false);
    } catch (error) {
        console.error("Error fetching user list:", error);
    }
    };

    useEffect(() => {
        if (updateUserList) getUserList();
    },[updateUserList]);
    return(<>
             <div className = "deleteAddContainer">
                <UserAdd
                setUpdateUserList = {setUpdateUserList}
                />
            </div>
        <div  className = "adminPanelListContainer">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>is email verified</th>
                        <th>companies</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((element, index) => (
                            <User
                            userId = {element.userId}
                            index = {index}
                            email = {element.email} 
                            emailVerified = {element.emailVerified}
                            name = {element.name}
                            companies = {element.companies}
                            setUpdateUserList = {setUpdateUserList}
                            getUserList = {getUserList}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
        </>
    );
}

export default UserManagementTable;
