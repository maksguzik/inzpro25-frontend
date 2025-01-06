import { useState, useEffect } from "react";
import DeviceLog from "./DeviceLog";
import DeviceLogFilter from "./Components/DeviceLogFilter";
import './DeviceLogStyle.css';
import '../LogUniversalViewStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceLogList(){
    const [deviceLogList, setDeviceLogList] = useState([]);
    const {getAccessTokenSilently} = useAuth0();
    const [currentPage, setCurrentPage] = useState(0);
    const [updateDeviceLogList, setUpdateDeviceLogList] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getDeviceLogList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL +'api/devices-logs?page=' + currentPage + '&size=5', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {setDeviceLogList(json.content.reverse()); setTotalPages(json.totalPages)})
        .then(()=>setUpdateDeviceLogList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if(updateDeviceLogList){
            getDeviceLogList();
        }
    },[updateDeviceLogList, getDeviceLogList]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
          setUpdateDeviceLogList(true);
        }
    };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
        setUpdateDeviceLogList(true);
    };

    return(<>
        <DeviceLogFilter
                    setDeviceLogList = {setDeviceLogList}
                />
        <div  className = "deviceLogListContainer">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>log Time</th>
                        <th>last Seen</th>
                        <th>device Type</th>
                        <th>device Serial Number</th>
                        <th>owner</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceLogList.map((element) => (
                        <DeviceLog
                        deviceId = {element.id} 
                        deviceLogTime = {element.logTime}
                        deviceLastSeenTime = {element.lastSeenTime}
                        deviceType = {element.deviceType}
                        deviceSerialNumber = {element.deviceSerialNumber} 
                        owner = {element.owner}
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

export default DeviceLogList;