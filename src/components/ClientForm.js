import React from 'react'

/* The ClientForm will allow the addition of a new client. Each handle function is 
destructured within the ClientForm parameters so it knows what it is. 

On the form, when the Submit button is clicked, it will execute onSubmit and run
the postNewClient function. This will complete the POST method or Create. 

For the Phone and Email inputs, it is coded so that entry of information is
specific in order for a successful submit. 

Finally, newClient is destructured to allow the form inputs to clear in its 
relative spots: .name, .jobTitle, .companyName, .phone, and .email. */
export default function ClientForm({ postNewClient, handleName, handleJobTitle,
    handleCompanyName, handlePhone, handleEmail, newClient }) {
    return (
        <form onSubmit={(e) => postNewClient(e)} className='clientForm'>
            <h3>Add New Client Information</h3>
            <label>Contact Full Name</label>
            <input onChange={(e) => handleName(e.target.value)}
                type='text'
                placeholder='Enter full name'
                value={newClient.name}
            />
            <label>Contact Job Title</label>
            <input onChange={(e) => handleJobTitle(e.target.value)}
                type='text'
                placeholder='Enter job title'
                value={newClient.jobTitle}
            />
            <label>Company Name</label>
            <input onChange={(e) => handleCompanyName(e.target.value)}
                type='text'
                placeholder='Enter company name'
                value={newClient.companyName}
            />
            <label>Phone</label>
            <input onChange={(e) => handlePhone(e.target.value)}
                type='tel'
                id='phone'
                name='phone'
                placeholder='Enter contact phone number'
                pattern='\d{3}[\-]\d{3}[\-]\d{4}'
                title='Phone number format: 123-456-7890'
                value={newClient.phone}
            />
            <label>Email</label>
            <input onChange={(e) => handleEmail(e.target.value)}
                type='email'
                id='email'
                name='email'
                placeholder='Enter contact email address'
                value={newClient.email}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}