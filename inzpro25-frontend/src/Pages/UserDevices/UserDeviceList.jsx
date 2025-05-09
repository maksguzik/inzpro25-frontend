import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserDevice from "./UserDevice";

function UserDeviceList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const {getAccessTokenSilently} = useAuth0();
    const [order, setOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('deviceType');

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getDeviceList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/user/devices?page=' + currentPage + '&size=5', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {setDeviceList(json.content); setTotalPages(json.totalPages)})
        .then(()=>setUpdateDeviceList(false))
        .catch(error => console.error(error));
    }

    const getDeviceListOrderedByNameAndSerialNumber = async (name) => {
        const token = await getAccessTokenSilently();
        fetch(`${URL}api/user/devices?page=${currentPage}&size=5&sortBy=${sortBy}&order=${order}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {
            setDeviceList(json.content);
            setTotalPages(json.totalPages);
        })
        .then(()=>setUpdateDeviceList(false))
        .catch(error => console.error(error));
    };

    useEffect(() => {
        if (updateDeviceList) getDeviceListOrderedByNameAndSerialNumber();
        console.log(deviceList)
    }, [updateDeviceList, getDeviceListOrderedByNameAndSerialNumber]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
          setUpdateDeviceList(true);
        }
    };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
        setUpdateDeviceList(true);
    };

    const handleSortDirectionChange = (direction) => {
        setOrder(direction);
    };

    const handleSortByChange = (sortBy)=>{
        setSortBy(sortBy);
    }

    return(<>
            <div className="orderAddDeleteContainer">
            <div className="orderContainer">
            <div className="sortLabel">
                    Sort By
                </div>
            <div className="sortDirection">
                    <div className="addToken">
                        <select
                            className="crudButton greyButton orderButtons deviceLogOrderButtons"
                            onChange={(e) => {handleSortByChange(e.target.value);
                                setUpdateDeviceList(true);
                            }}
                        >
                            <option value="serialNumber">Serial Number</option>
                            <option value="name">Name</option>
                            <option value="deviceType">Device Type</option>
                            <option value="companyName">Company Name</option>
                        </select>
                    </div>
            </div>
                <div className="sortDirection">
                    <div className="addToken">
                        <select
                            className="crudButton greyButton orderButtons"
                            onChange={(e) => {handleSortDirectionChange(e.target.value);
                                setUpdateDeviceList(true);
                            }}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
            </div>
            </div>
    <div className="deleteAddContainer">

    </div>
    </div>
        <div  className = "deviceTokenListContainer">
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>serial Number</th>
                        <th>name</th>
                        <th>device Type</th>
                        <th>owner</th>
                        <th>status</th>
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
                        down={element.down}
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

export default UserDeviceList;