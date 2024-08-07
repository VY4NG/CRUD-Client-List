import React from 'react'

/* The ClientList component will render the clients from the API into a table. This 
will complete the GET method or Read. 

The openUpdateModal is destructured so the ✎ button can work successfully. This will
complete the PUT method or Update.

The deleteClient is destructured so the 🗑 button can work successfully. This will
complete the DELETE method or Delete. */
export default function ClientList({ clients, openUpdateModal, deleteClient }) {
    return (
    <table>
        <caption>Client List</caption>
        <thead>
            <tr>
                <th>Client ID</th>
                <th>Company Name</th>
                <th>Contact Full Name</th>
                <th>Contact Job Title</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Update</th>    
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {clients.map((client, index) => (
                <tr key={index}>
                    <td>{client.id}</td>
                    <td>{client.companyName}</td>
                    <td>{client.name}</td>
                    <td>{client.jobTitle}</td>
                    <td>{client.phone}</td>
                    <td>{client.email}</td>
                    <td>
                        <button className='updateButton'
                            onClick={() => openUpdateModal(client)}>✎</button>
                    </td>
                    <td>
                        <button className='deleteButton'
                            onClick={() => deleteClient(client.id)}>🗑</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    )
}