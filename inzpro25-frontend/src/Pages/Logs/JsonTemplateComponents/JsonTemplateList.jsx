import { useState, useEffect } from "react";
import JsonTemplate from "./JsonTemplate";
import AddJsonTemplate from "./Components/AddJsonTemplate";
import JsonTemplateDelete from "./Components/JsonTemplateDelete";
import '../LogUniversalViewStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function JsonTemplateList(){
    const [deviceList, setDeviceList] = useState([]);
    const [updateDeviceList, setUpdateDeviceList] = useState(true);
    const [deviceIdDeleteList, setDeviceIdDeleteList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getDeviceList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/device-types?page=' + currentPage + '&size=5', {
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

    useEffect(() => {
        if (updateDeviceList) getDeviceList();
    });

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

    return(<>
        <div className = "deleteAddContainer">
                <AddJsonTemplate
                setUpdateDeviceList = {setUpdateDeviceList}
                />
                <div className="deleteToken">
                    <JsonTemplateDelete
                            deviceIdDeleteList = {deviceIdDeleteList}
                            setUpdateDeviceList = {setUpdateDeviceList}
                    />
                </div>
        </div>
        <div  className = "deviceTokenListContainer">
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Device Name</th>
                        <th>Id</th>
                        <th>Logged at</th>
                        <th>Last seen</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {deviceList.map((element, index) => (
                        <JsonTemplate
                        key = {element.deviceTypeName}
                        index = {index}
                        deviceTypeName = {element.deviceTypeName}
                        idMapping = {element.idMapping}
                        loggedAtMapping = {element.loggedAtMapping}
                        lastSeenMapping = {element.lastSeenMapping}
                        setUpdateDeviceList = {setUpdateDeviceList}
                        setDeviceIdDeleteList = {setDeviceIdDeleteList}
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

export default JsonTemplateList;