import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import User from "./User";
import UserAdd from "./UserAdd";

function UserManagementTable(){


    const [userList, setUserList] = useState([]);
    const [updateUserList, setUpdateUserList] = useState(true);
    const [companyList, setCompanyList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const elementPerPage = 5;

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const getCompanyList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/companies', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {setCompanyList(json.content);  setTotalPages(json.content.length/elementPerPage)})
        .catch(error => console.error(error));
    }


    const getUserList = async () => {
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(URL + "api/admin-panel/users?page=" + currentPage + "&perPage=" + elementPerPage, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setUserList(json.userResponseList);
        setTotalPages(Math.ceil(json.totalUsers/elementPerPage));
        setUpdateUserList(false);
    } catch (error) {
        console.error("Error fetching user list:", error);
    }
    };

    useEffect(() => {
        if (updateUserList) {getUserList();
            getCompanyList();
        };
    },[updateUserList]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
          setUpdateUserList(true);
        }
    };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
        setUpdateUserList(true);
    };
    
    return(<>
             <div className = "deleteAddContainer">
                <UserAdd
                setUpdateUserList = {setUpdateUserList}
                companyList={companyList}
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
                        <th>roles</th>
                        <th></th>
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
                            companyList={companyList}
                            />
                        ))
                    }
                </tbody>
            </table>
            <div className="pagination">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 0}
                    className="crudButton greyButton paginationButton"
                >
                    ◀ Previous
                </button>
                <span className="paginationInfo">PAGE {currentPage + 1}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                    className="crudButton greyButton paginationButton"
                >
                    Next ▶
                </button>
            </div>

        </div>
        </>
    );
}

export default UserManagementTable;
