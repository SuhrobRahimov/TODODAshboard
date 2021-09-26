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

const UserList = ({users}) => {
    return (
        <table>
            <th>UserID</th>
            <th>Email</th>
            <th>User name</th>
            <th>First name</th>
            <th>Last name</th>
            {users.map((u) => <UserItem user={u} />)}        
        </table>
    )
}


export default UserList;