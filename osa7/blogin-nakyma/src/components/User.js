import React from 'react'

const User = ({ user, blogs }) => {
    if (!user) { return null }
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {blogs.filter(b => b.user ? b.user.id === user.id : false)
                    .map(b => <li key={b.id}>{b.title}</li>)}
            </ul>
        </div>
    )
}


export default User