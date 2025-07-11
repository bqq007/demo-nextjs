import React from 'react'

interface User {
    id: number;
    firstname: string;
    lastname: string;
}
export default async function UsersPage() {
    const res = await fetch(
        'https://jsonplaceholder.org/users',
        {
            "cache": "no-store", // Disable caching for this request
        }
    )
    const users:User[] = await res.json()
  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <a href={`/users/${user.id}`}>{user.lastname} {user.firstname}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
