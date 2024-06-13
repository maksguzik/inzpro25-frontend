import { useState } from "react";

function DeviceLogFilter({setDeviceLogList}){

    const URL = 'http://localhost:8080/api/devices-logs/';
    const [timeStampUpperLimit, setTimeStampUpperLimit] = useState({
        "year" : "2024",
        "month" : "6",
        "day" : "12"
    });
    const [timeStampLowerLimit, setTimeStampLowerLimit] = useState({
        "year" : "2020",
        "month" : "6",
        "day" : "12"
    });
    const [chosenTimeStampRange, setChosenTimeStampRange] = useState('between');

    const FiterDeviceLogList = async() =>{
        if(timeStampLowerLimit.day.length === 0 &&
            timeStampLowerLimit.day.length === 0 &&
            timeStampLowerLimit.day.length === 0){
            setChosenTimeStampRange(`before?lastSeenTime=\
                ${timeStampLowerLimit.year}-\
                ${timeStampLowerLimit.month}-\
                ${timeStampLowerLimit.day}T23:59:59.000Z`);
        }else if(timeStampUpperLimit.day.length === 0 &&
            timeStampUpperLimit.day.length === 0 &&
            timeStampUpperLimit.day.length === 0){
            setChosenTimeStampRange(`after?lastSeenTime=\
                ${timeStampUpperLimit.year}-\
                ${timeStampUpperLimit.month}-\
                ${timeStampUpperLimit.day}T23:59:59.000Z`);
        }
        else{
            setChosenTimeStampRange(`between?startTime=\
                ${timeStampLowerLimit.year}-\
                ${timeStampLowerLimit.month}-\
                ${timeStampLowerLimit.day}T23:59:59.000Z&endTime=\
                ${timeStampUpperLimit.year}-\
                ${timeStampUpperLimit.month}-\
                ${timeStampUpperLimit.day}T23:59:59.000Z`);
        }
        fetch(URL + chosenTimeStampRange)
        .then(response => response.json())
        .then(json => setDeviceLogList(json))
        .catch(error => console.error(error));
    }

    

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
                value = {timeStampLowerLimit.day}
                onChange = {(event)=>InputTimeStampLowerLimitChange(event, "day")}
            ></input>
            <input
                value = {timeStampLowerLimit.month}
                onChange = {(event)=>InputTimeStampLowerLimitChange(event, "month")}
            ></input>
            <input
                value = {timeStampLowerLimit.year}
                onChange = {(event)=>InputTimeStampLowerLimitChange(event, "year")}
            ></input>
            <input
                value = {timeStampUpperLimit.day}
                onChange = {(event)=>InputTimeStampUpperLimitChange(event, "day")}
            ></input>
            <input
                value = {timeStampUpperLimit.month}
                onChange = {(event)=>InputTimeStampUpperLimitChange(event, "month")}
            ></input>
            <input
                value = {timeStampUpperLimit.year}
                onChange = {(event)=>InputTimeStampUpperLimitChange(event, "year")}
            ></input>
            <button
                onClick = {FiterDeviceLogList}
            >SEARCH</button>
        </>
    )

}

export default DeviceLogFilter;