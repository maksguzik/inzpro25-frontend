
function UserDisplay({userId, index, email, emailVerified, name, companies, roles}){

    return (
        <>
            <td></td>
            <td>{userId}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{(emailVerified) ? "✔" : "✘"}</td>
            <td>{companies.join(', ')}</td>
            <td>{roles.join(', ')}</td>
        </>
    )
}

export default UserDisplay;