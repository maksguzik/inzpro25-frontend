import React, { useState, useEffect } from "react";
import "./CompanySummary.css";
import { useAuth0 } from "@auth0/auth0-react";
import DeviceSummaryTable from "./CompanySummaryComponents/DeviceSummaryTable";

function CompanySummary() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDevices, setShowDevices] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const URL = process.env.REACT_APP_AUTH0_AUDIENCE;

  const fetchCompanies = async (query = "", page = 0, size = 5) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        URL + `api/companies?name=${query}&page=${page}&size=${size}&sortBy=id&order=asc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCompanies(data.content);
      if (data.content.length > 0) {
        setSelectedCompany(data.content[0]);
      } else {
        setSelectedCompany(null);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCompanies(searchQuery); 
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDevices(false); 
  };

  const handleSelectionChange = (e) => {
    const companyId = parseInt(e.target.value, 10);
    const company = companies.find((c) => c.id === companyId);
    setSelectedCompany(company);
    setShowDevices(false); 
  };

  const handleSearch = () => {
    setShowDevices(true); 
  };

  return (
    <div className="company-summary">
      <div className="dropdown-container">
        <label htmlFor="companySearch">Search Company: </label>
        <input
          id="companySearch"
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Type company name..."
        />
        <select
          id="companyDropdown"
          onChange={handleSelectionChange}
          value={selectedCompany ? selectedCompany.id : ""}
        >
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="crudButton greyButton searchButton"
          disabled={!selectedCompany}
        >
          Search
        </button>
      </div>
      {showDevices && selectedCompany && (
        <DeviceSummaryTable companyId={selectedCompany.id} />
      )}
    </div>
  );
}

export default CompanySummary;