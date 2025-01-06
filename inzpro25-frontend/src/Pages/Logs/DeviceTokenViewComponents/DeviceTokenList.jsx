import DeviceToken from "./DeviceToken";
import { useState, useEffect } from "react";
import AddDeviceToken from "./Components/AddDeviceToken";
import DeviceTokenDelete from "./Components/DeviceTokenDelete";
import './DeviceTokenStyle.css';
import '../LogUniversalViewStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceTokenList(){
    const [deviceTokenList, setDeviceTokenList] = useState([]);
    const [updateDeviceTokenList, setUpdateDeviceTokenList] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [tokenIdDeleteList, setTokenIdDeleteList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [order, setOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('deviceTypeName');
    const [searchName, setSearchName] = useState('');

    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getDeviceTokenList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/devices-tokens?page=' + currentPage + '&size=5', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {setDeviceTokenList(json?.content || []); setTotalPages(json?.totalPages || 0)})
        .then(()=>setUpdateDeviceTokenList(false))
        .catch(error => console.error(error));
    }

    const getDeviceTokenListOrdered = async () => {
        const token = await getAccessTokenSilently();
        fetch(`${URL}api/devices-tokens?page=${currentPage}&size=5&sortBy=${sortBy}&order=${order}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {
            setDeviceTokenList(json?.content || []);
            setTotalPages(json?.totalPages || 0);
        })
        .then(()=>setUpdateDeviceTokenList(false))
        .catch(error => console.error(error));
    };

    useEffect(() => {
        if (updateDeviceTokenList) getDeviceTokenListOrdered();
    });
    
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
          setUpdateDeviceTokenList(true);
        }
    };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
        setUpdateDeviceTokenList(true);
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
            {/* <div className="sortDirection">
                    <div className="addToken">
                    <select
                        className="crudButton greyButton orderButtons"
                        onChange={(e) => handleSortByChange(e.target.value)}
                    >
                        <option value="deviceTypeName">Device Type</option>
                        <option value="id">Id</option>
                    </select>
                </div>
                </div> */}
                <div className="sortDirection">
                    <div className="addToken">
                    <select
                        className="crudButton greyButton orderButtons"
                        onChange={(e) => {handleSortDirectionChange(e.target.value);
                            setUpdateDeviceTokenList(true);
                        }}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                
        </div>
        <div className="sortDirection">
            <div className="addToken">
            {/* <button
                className="crudButton greyButton searchByNameButton"
                onClick={() => getDeviceTokenListOrdered()}
            >
            Search
        </button> */}
            </div>
        </div>
        
            </div>
    <div className = "deleteAddContainer">
                <AddDeviceToken
                setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                />
                <div className="deleteToken">
                <DeviceTokenDelete
                            tokenIdDeleteList = {tokenIdDeleteList}
                            setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                />
                </div>
            </div>
            </div>
        <div  className = "deviceTokenListContainer">
            
            
            <table>
                <thead>
                    <tr>
                    <th></th>
                        <th>Id</th>
                        <th>token</th>
                        <th>device Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className = "kielba">
                    {deviceTokenList.map((element, index) => (
                        <DeviceToken
                        key = {element.id}
                        index = {index}
                        tokenId = {element.id} 
                        token = {element.token}
                        deviceTypeName = {element.deviceTypeName} 
                        setUpdateDeviceTokenList = {setUpdateDeviceTokenList}
                        setTokenIdDeleteList = {setTokenIdDeleteList}
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

export default DeviceTokenList;