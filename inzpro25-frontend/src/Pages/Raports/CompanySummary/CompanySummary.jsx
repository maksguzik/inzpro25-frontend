import React, { useState, useEffect } from "react";
import "./CompanySummary.css";
import { useAuth0 } from "@auth0/auth0-react";
import DeviceSummaryTable from "./CompanySummaryComponents/DeviceSummaryTable";

function CompanySummary() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDevices, setShowDevices] = useState(false);
  const {getAccessTokenSilently} = useAuth0();

  const fetchCompanies = async () => {
    try {

      const token = await getAccessTokenSilently();
      const response = await fetch(
        "http://localhost:8080/api/companies?page=0&size=10&sortBy=id&order=asc",
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
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSelectionChange = (e) => {
    const companyId = parseInt(e.target.value, 10);
    const company = companies.find((c) => c.id === companyId);
    setSelectedCompany(company);
  };

  const handleSearch = () => {
      setShowDevices(true);
  };

  return (
    <div className="company-summary">
      <div className="dropdown-container">
        <label htmlFor="companyDropdown">Choose Company: </label>
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
        <button onClick={handleSearch} className="crudButton greyButton paginationButton">
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
