import { useState } from "react";

function UserDelete({userId, setUpdateUserList}){


    const URL = process.env.REACT_APP_AUTH0_AUDIENCE;


    
    return(
        <>
            <div>
                <button className="crudButton greenButton" onClick={deleteUser}>DELETE</button>
            </div>
        </>
    )
}

export default UserDelete;
