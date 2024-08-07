import React from 'react'
import './UpdateClientModal.css' // Import CSS for modal styling.

/* Destructured functions: showModal, closeUpdateModal, saveUpdatedClient, 
currentClient, and handleUpdateChange. This is needed so that the modal can 
successfully make changes and update the information on a current client. 

This will complete the PUT method or Update.*/
export default function UpdateClientModal({ showModal, closeUpdateModal,
    saveUpdatedClient, currentClient, handleUpdateChange }) {
    if (!showModal) return null;

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <span className='modalClose' onClick={closeUpdateModal}>&times;</span>
                <h2>Update Client</h2>
                <form onSubmit={saveUpdatedClient}>
                    <label>Contact Full Name</label>
                    <input onChange={(e) => handleUpdateChange('name', e.target.value)}
                        type='text'
                        placeholder='Enter full name'
                        value={currentClient.name}
                    />
                    <label>Contact Job Title</label>
                    <input onChange={(e) => handleUpdateChange('jobTitle', e.target.value)}
                        type='text'
                        placeholder='Enter job title'
                        value={currentClient.jobTitle}
                    />
                    <label>Company Name</label>
                    <input onChange={(e) => handleUpdateChange('companyName', e.target.value)}
                        type='text'
                        placeholder='Enter company name'
                        value={currentClient.companyName}
                    />
                    <label>Phone</label>
                    <input onChange={(e) => handleUpdateChange('phone', e.target.value)}
                        type='tel'
                        id='phone'
                        name='phone'
                        placeholder='Enter contact phone number'
                        pattern='\d{3}[\-]\d{3}[\-]\d{4}'
                        title='Phone number format: 123-456-7890'
                        value={currentClient.phone}
                    />
                    <label>Email</label>
                    <input onChange={(e) => handleUpdateChange('email', e.target.value)}
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter contact email address'
                        value={currentClient.email}
                    />
                    <button type='submit'>Save Changes</button>
                </form>
            </div>
        </div>
    );
};