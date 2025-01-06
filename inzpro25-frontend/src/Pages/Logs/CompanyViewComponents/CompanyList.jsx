import Company from "./Company";
import { useState, useEffect } from "react";
import AddCompany from "./Components/AddCompany";
import CompanyDelete from "./Components/CompanyDelete";
import './CompanyStyle.css';
import '../LogUniversalViewStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function CompanyList(){
    const [companyList, setCompanyList] = useState([]);
    const [updateCompanyList, setUpdateCompanyList] = useState(true);
    const [companyIdDeleteList, setCompanyIdDeleteList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [order, setOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('name');
    const [searchName, setSearchName] = useState('');

    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getCompanyList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL + 'api/companies?page=' + currentPage + '&size=5', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {setCompanyList(json.content); setTotalPages(json.totalPages)})
        .then(()=>setUpdateCompanyList(false))
        .catch(error => console.error(error));
    }

    const getCompanyListOrderedByName = async () => {
        const token = await getAccessTokenSilently();
        fetch(`${URL}api/companies?page=${currentPage}&size=5&sortBy=${sortBy}&order=${order}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => {
            setCompanyList(json.content);
            setTotalPages(json.totalPages);
        }).then(()=>setUpdateCompanyList(false))
        .catch(error => console.error(error));
    };

    useEffect(() => {
        if (updateCompanyList) getCompanyListOrderedByName();
    }, [updateCompanyList, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prevPage) => prevPage + 1);
          setUpdateCompanyList(true);
        }
    };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
        setUpdateCompanyList(true);
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
                {/* <div className="searchByNameContainer">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div> */}
                <div className="sortDirection">
                    <div className="addToken">
                        <select
                            className="crudButton greyButton orderButtons"
                            onChange={(e) => {handleSortDirectionChange(e.target.value);
                                setUpdateCompanyList(true);
                            }}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
            </div>
        {/* <div className="sortDirection">
            <div className="addToken">
                <button
                    className="crudButton greyButton searchByNameButton"
                    onClick={() => getCompanyListOrderedByName()}
                >
                Search
                </button>
            </div>
        </div> */}
        
            </div>
            <div className = "deleteAddContainer">
                <AddCompany
                setUpdateCompanyList = {setUpdateCompanyList}
                />
                <div className="deleteToken">
                    <CompanyDelete
                            companyIdDeleteList = {companyIdDeleteList}
                            setUpdateCompanyList = {setUpdateCompanyList}
                    />
                </div> 
            </div>
        </div>
        
        <div  className = "companyListContainer">
            
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Company name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {companyList.map((element, index) => (
                        <Company
                        key = {element.id}
                        index = {index}
                        companyId = {element.id} 
                        companyName = {element.name}
                        setUpdateCompanyList = {setUpdateCompanyList}
                        setCompanyIdDeleteList = {setCompanyIdDeleteList}
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

export default CompanyList;