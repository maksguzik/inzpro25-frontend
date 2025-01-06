import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserDevice from "./UserDevice";

function UserDeviceList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getDeviceList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/user/devices?page=' + currentPage + '&size=9', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => setDeviceList(json.content))
        .then(()=>setUpdateDeviceList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (updateDeviceList) getDeviceList();
    }, [updateDeviceList, getDeviceList]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setUpdateDeviceList(true);
    };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
        setUpdateDeviceList(true);
    };

    return(<>
        <div  className = "deviceListContainer">
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>serial Number</th>
                        <th>name</th>
                        <th>device Type</th>
                        <th>owner</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {deviceList.map((element, index) => (
                        <UserDevice
                        key = {element.id}
                        index = {index}
                        deviceId = {element.id} 
                        deviceSerialNumber = {element.serialNumber}
                        deviceName = {element.name}
                        deviceType = {element.deviceType}
                        deviceCompanyName = {element.companyName} 
                        />
                    ))}
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
                    className="crudButton greyButton paginationButton"
                >
                    Next ▶
                </button>
            </div>
        </div>
        </>
    );
}

export default UserDeviceList;