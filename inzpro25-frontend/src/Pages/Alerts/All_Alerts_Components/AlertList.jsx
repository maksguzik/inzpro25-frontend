import React, { useState, useEffect } from "react";
import AlertItem from "../All_Alerts_Components/Components/AlertItem";
import Alert from "./Alert";
import DeleteAlert from "./Components/DeleteAlert";

function AlertList() {
  const [alertsList, setAlertsList] = useState([
    {
      id: 1,
      name: "Test Alert 1",
      email: "alert1@example.com",
      is_active: true,
    },
    {
      id: 2,
      name: "Test Alert 2",
      email: "alert2@example.com",
      is_active: true,
    },
    {
      id: 3,
      name: "Test Alert 3",
      email: "alert3@example.com",
      is_active: false,
    },
  ]);

  const [updateAlertsList, setUpdateAlertsList] = useState(true);
  const [deleteAlertList, setDeleteAlertList] = useState([])

  // const URL = '/api/alerts';
  // const getAlertsList = () =>{
  //     fetch(URL)
  //     .then(response => response.json())
  //     .then(json => setAlertsList(json))
  //     .then(()=>setUpdateAlertsList(false))
  //     .catch(error => console.error(error));
  // }

  // useEffect(() => {
  //     if (updateAlertsList) getAlertsList();
  // });

  return (
    <>
        <div className = "deleteAddContainer">
                <div className="deleteToken">
                    <DeleteAlert
                            deleteAlertList = {deleteAlertList}
                            setUpdateAlertsList = {setUpdateAlertsList}
                            setAlertsList = {setAlertsList}
                    />
                </div>
            </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {alertsList.map((element, index) => (
              <Alert
                key={element.id}
                index={index}
                id={element.id}
                name={element.name}
                email={element.email}
                isActive={element.is_active}
                setUpdateAlertsList = {setUpdateAlertsList}
                setDeleteAlertList= {setDeleteAlertList}
                setAlertsList = {setAlertsList}
              />
            ))}
          </tbody>
        </table>

    </>
  );
}

export default AlertList;
