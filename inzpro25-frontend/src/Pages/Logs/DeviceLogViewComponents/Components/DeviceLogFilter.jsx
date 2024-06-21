import { useEffect, useState } from "react";
import './DeviceLogComponentStyle.css';

function DeviceLogFilter({setDeviceLogList}){

    const URL = 'http://localhost:8080/api/devices-logs/';
    // const [timeStampUpperLimit, setTimeStampUpperLimit] = useState({
    //     "year" : "2024",
    //     "month" : "06",
    //     "day" : "12"
    // });
    // const [timeStampLowerLimit, setTimeStampLowerLimit] = useState({
    //     "year" : "2020",
    //     "month" : "06",
    //     "day" : "12"
    // });
    const [chosenTimeStampRange, setChosenTimeStampRange] = useState('between');
    const [datePickedBefore, setDatePickedBefore] = useState('2024-06-22T12:30');
    const [datePickedAfter, setDatePickedAfter] = useState('2018-06-12T19:30');


    const FilterDeviceLogList = () =>{
        fetch(URL + chosenTimeStampRange + `?startTime=${datePickedAfter}:11Z&endTime=${datePickedBefore}:11Z`)
        .then(response => response.json())
        .then(json => setDeviceLogList(json))
        .catch(error => console.error(error));
    }

    // useEffect(() => {
    //     if(timeStampLowerLimit.day.length === 0 &&
    //         timeStampLowerLimit.day.length === 0 &&
    //         timeStampLowerLimit.day.length === 0){
    //         setChosenTimeStampRange(`before?lastSeenTime=${timeStampUpperLimit.year}-${timeStampUpperLimit.month}-${timeStampUpperLimit.day}T23:59:59Z`);
    //     }else if(timeStampUpperLimit.day.length === 0 &&
    //         timeStampUpperLimit.day.length === 0 &&
    //         timeStampUpperLimit.day.length === 0){
    //         setChosenTimeStampRange(`after?lastSeenTime=${timeStampLowerLimit.year}-${timeStampLowerLimit.month}-${timeStampLowerLimit.day}T23:59:59Z`);
    //     }
    //     else{
    //         setChosenTimeStampRange(`between?startTime=${timeStampLowerLimit.year}-${timeStampLowerLimit.month}-${timeStampLowerLimit.day}T23:59:59Z&endTime=${timeStampUpperLimit.year}-${timeStampUpperLimit.month}-${timeStampUpperLimit.day}T23:59:59Z`);
    //     }
    //  });

    // const InputTimeStampLowerLimitChange = (event, key) =>{
    //     event.preventDefault();
    //     setTimeStampLowerLimit({
    //         ...timeStampLowerLimit,
    //         [key]: event.target.value
    //     })
    // }

    // const InputTimeStampUpperLimitChange = (event, key) =>{
    //     event.preventDefault();
    //     setTimeStampUpperLimit({
    //         ...timeStampUpperLimit,
    //         [key]: event.target.value
    //     })
    // }
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