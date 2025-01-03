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

    const {getAccessTokenSilently} = useAuth0();

    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

    const getCompanyList = async() =>{
        const token = await getAccessTokenSilently();
        console.log(token);
        fetch(URL + 'api/companies?page=' + currentPage + '&size=9', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(json => setCompanyList(json.content))
        .then(()=>setUpdateCompanyList(false))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if (updateCompanyList) getCompanyList();
    });

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setUpdateCompanyList(true);
    };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
        setUpdateCompanyList(true);
    };

    return(<>
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