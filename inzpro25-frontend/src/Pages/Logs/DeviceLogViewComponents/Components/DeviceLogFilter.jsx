import { useState } from "react";
import './DeviceLogComponentStyle.css';
import { useAuth0 } from "@auth0/auth0-react";

function DeviceLogFilter({setDeviceLogList}){

    const URL = 'http://localhost:8080/api/devices-logs/';
    const {getAccessTokenSilently} = useAuth0();

    const [chosenTimeStampRange, setChosenTimeStampRange] = useState('between');
    const [datePickedBefore, setDatePickedBefore] = useState('2024-06-22T12:30');
    const [datePickedAfter, setDatePickedAfter] = useState('2018-06-12T19:30');


    const FilterDeviceLogList = async() =>{
        const token = await getAccessTokenSilently();
        fetch(URL + chosenTimeStampRange + `?startTime=${datePickedAfter}:11Z&endTime=${datePickedBefore}:11Z`,
            {
                method: 'GET',
                headers : { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(response => response.json())
        .then(json => setDeviceLogList(json))
        .catch(error => console.error(error));
    }

    const handleChangeAfter = (event) => {
        setDatePickedAfter(event.target.value);
    };

    const handleChangeBefore = (event) => {
        setDatePickedBefore(event.target.value);
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
    
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

    return (
       
        <div className="searchLogs">
            <label htmlFor="start-time"></label>
            <input
                className = "inputDatePicker"
                type="datetime-local"
                id="start-time"
                name="start-time"
                value={datePickedAfter || '2018-06-07T00:00'}
                min="2018-06-07T00:00"
                max={getCurrentDateTime()}
                onChange={handleChangeAfter}
            />
            <label htmlFor="end-time"></label>
            <input
                className = "inputDatePicker"
                type="datetime-local"
                id="end-time"
                name="end-time"
                value={datePickedBefore || '2024-06-22T12:30'}
                min="2018-06-07T00:00"
                max={getCurrentDateTime()}
                onChange={handleChangeBefore}
            />
            <button
                className = "crudButton greenButton searchButton"
                onClick = {FilterDeviceLogList}
            >SEARCH</button>
            </div>
        
    )

}

export default DeviceLogFilter;