import { useEffect, useState } from "react";
import './DeviceLogComponentStyle.css';

function DeviceLogFilter({setDeviceLogList}){

    const URL = 'http://localhost:8080/api/devices-logs/';
    const [timeStampUpperLimit, setTimeStampUpperLimit] = useState({
        "year" : "2024",
        "month" : "06",
        "day" : "12"
    });
    const [timeStampLowerLimit, setTimeStampLowerLimit] = useState({
        "year" : "2020",
        "month" : "06",
        "day" : "12"
    });
    const [chosenTimeStampRange, setChosenTimeStampRange] = useState('between');

    const FiterDeviceLogList = () =>{
        fetch(URL + chosenTimeStampRange)
        .then(response => response.json())
        .then(json => setDeviceLogList(json))
        .catch(error => console.error(error));
    }

    useEffect(() => {
        if(timeStampLowerLimit.day.length === 0 &&
            timeStampLowerLimit.day.length === 0 &&
            timeStampLowerLimit.day.length === 0){
            setChosenTimeStampRange(`before?lastSeenTime=${timeStampUpperLimit.year}-${timeStampUpperLimit.month}-${timeStampUpperLimit.day}T23:59:59Z`);
        }else if(timeStampUpperLimit.day.length === 0 &&
            timeStampUpperLimit.day.length === 0 &&
            timeStampUpperLimit.day.length === 0){
            setChosenTimeStampRange(`after?lastSeenTime=${timeStampLowerLimit.year}-${timeStampLowerLimit.month}-${timeStampLowerLimit.day}T23:59:59Z`);
        }
        else{
            setChosenTimeStampRange(`between?startTime=${timeStampLowerLimit.year}-${timeStampLowerLimit.month}-${timeStampLowerLimit.day}T23:59:59Z&endTime=${timeStampUpperLimit.year}-${timeStampUpperLimit.month}-${timeStampUpperLimit.day}T23:59:59Z`);
        }
     });

    const InputTimeStampLowerLimitChange = (event, key) =>{
        event.preventDefault();
        setTimeStampLowerLimit({
            ...timeStampLowerLimit,
            [key]: event.target.value
        })
    }

    const InputTimeStampUpperLimitChange = (event, key) =>{
        event.preventDefault();
        setTimeStampUpperLimit({
            ...timeStampUpperLimit,
            [key]: event.target.value
        })
    }

    return (
        <>
            <input
                className = "inputDeviceLogFilter"
                value = {timeStampLowerLimit.day}
                onChange = {(event)=>InputTimeStampLowerLimitChange(event, "day")}
            ></input>
            <input
                className = "inputDeviceLogFilter"
                value = {timeStampLowerLimit.month}
                onChange = {(event)=>InputTimeStampLowerLimitChange(event, "month")}
            ></input>
            <input
                className = "inputDeviceLogFilter"
                value = {timeStampLowerLimit.year}
                onChange = {(event)=>InputTimeStampLowerLimitChange(event, "year")}
            ></input>
            <input
                className = "inputDeviceLogFilter"
                value = {timeStampUpperLimit.day}
                onChange = {(event)=>InputTimeStampUpperLimitChange(event, "day")}
            ></input>
            <input
                className = "inputDeviceLogFilter"
                value = {timeStampUpperLimit.month}
                onChange = {(event)=>InputTimeStampUpperLimitChange(event, "month")}
            ></input>
            <input
                className = "inputDeviceLogFilter"
                value = {timeStampUpperLimit.year}
                onChange = {(event)=>InputTimeStampUpperLimitChange(event, "year")}
            ></input>
            <button
                className = "greenButton"
                onClick = {FiterDeviceLogList}
            >SEARCH</button>
        </>
    )

}

export default DeviceLogFilter;