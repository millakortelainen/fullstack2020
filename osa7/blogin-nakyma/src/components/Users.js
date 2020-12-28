import React from 'react'
import { Link } from "react-router-dom"

const Users = ({ users, blogs }) => {
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u =>
                        <tr key={u.id}>
                            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                            <td>{blogs.filter(b => b.user ? b.user.id === u.id : false).length} </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}


export default Users