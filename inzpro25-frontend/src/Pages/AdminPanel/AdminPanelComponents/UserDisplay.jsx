
function UserDisplay({userId, index, email, emailVerified, name, companies}){

    return (
        <>
            <td></td>
            <td>{userId}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{(emailVerified) ? "✔" : "✘"}</td>
            <td>{companies}</td>
        </>
    )
}

export default UserDisplay;