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
    const [order, setOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('deviceTypeName');
    const [deviceTypeName, setDeviceTypeName] = useState('');

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

    const getDeviceListOrdered = async () => {
        const token = await getAccessTokenSilently();
        fetch(`${URL}api/device-types?deviceTypeName=${deviceTypeName}&page=${currentPage}&size=5&sortBy=${sortBy}&order=${order}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {
            setDeviceList(json?.content || []);
            setTotalPages(json?.totalPages || 0);
        })
        .then(()=>setUpdateDeviceList(false))
        .catch(error => console.error(error));
    };

    useEffect(() => {
        if (updateDeviceList) getDeviceListOrdered();
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

    const handleSortDirectionChange = (direction) => {
        setOrder(direction);
    };

    const handleSortByChange = (sortBy)=>{
        setSortBy(sortBy);
    }

    return(<>
    <div className="orderAddDeleteContainer">
        <div className="orderContainer">
        <div className="searchByNameContainer">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search by Device Type"
                        value={deviceTypeName}
                        onChange={(e) => {setDeviceTypeName(e.target.value);
                            setUpdateDeviceList(true);
                        }}
                    />
                </div>
        <div className="sortLabel">
                    Sort By
                </div>
            <div className="sortDirection">
                    <div className="addToken">
                    <select
                        className="crudButton greyButton orderButtons"
                        onChange={(e) => {handleSortByChange(e.target.value);
                            setUpdateDeviceList(true);
                        }}
                    >
                        <option value="deviceTypeName">Device Name</option>
                        <option value="loggedAtMapping">Logged at</option>
                        <option value="lastSeenMapping">Last seen</option>
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
        </div>
        <div  className = "deviceTokenListContainer">
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Device Type</th>
                        <th>Id Mapping</th>
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
                        deviceId={element.id}
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