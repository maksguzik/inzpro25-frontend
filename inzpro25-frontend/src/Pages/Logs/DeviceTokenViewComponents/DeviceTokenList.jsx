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
    // const [selectedRecord, setSelectedRecord] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [tokenIdDeleteList, setTokenIdDeleteList] = useState([]);

    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getDeviceTokenList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/devices-tokens?page=' + currentPage + '&size=9', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => setDeviceTokenList(json.content))
        .then(()=>setUpdateDeviceTokenList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (updateDeviceTokenList) getDeviceTokenList();
    });
    
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setUpdateDeviceTokenList(true);
    };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
        setUpdateDeviceTokenList(true);
    };

    return(<>
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