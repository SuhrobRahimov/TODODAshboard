import React from "react";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
        </tr>
    )
}

const AuthorList = ({authors}) => {
    return (
        <table>
            <th>First name</th>
            <th>Last name</th>
            <th>Birthday year</th>
            {authors.map((a) => <AuthorItem author={a} />)}        
        </table>
    )
}


export default AuthorList;