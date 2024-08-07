/*
Coding Steps:
- Using the Houses API, or any open API of your choice you can find online, 
  create a single page that allows for all 4 CRUD operations to be performed on 
  a resource from the API. --> COMPLETE
- Create a React component (or more, if needed) to represent the resource. --> COMPLETE
- Make all forms and other necessary UI pieces their own components as reasonable. --> COMPLETE
*/

import { useState, useEffect } from 'react';
import './App.css';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import UpdateClientModal from './components/modal/UpdateClientModal';

function App() {

  // Created const variable for mockAPI URL.
  const API_URL = "https://66858386b3f57b06dd4d0089.mockapi.io/crud/app/tests/api/company_users"

  /* Created state to save clients from the API. Setting default values if clients
  does not exist. */
  const [clients, setClients] = useState([{
    name: '',
    jobTitle: '',
    companyName: '',
    phone: '',
    email: ''
  }])

  /* Created state for the newClient variable. Setting a new client as an object
  as defined within useState. */
  const [newClient, setNewClient] = useState({
    name: '',
    jobTitle: '',
    companyName: '',
    phone: '',
    email: ''
  })

  // Function to update the state for newClient, updating name.
  function handleName(nameValue) {
    setNewClient({
      ...newClient, // Takes the spread value of the new client.
      name: nameValue // Sets the name value equal to nameValue.
    })
  }

  // Function to update the state for newClient, updating jobTitle.
  function handleJobTitle(jobTitleValue) {
    setNewClient({
      ...newClient, // Takes the spread value of the new client.
      jobTitle: jobTitleValue // Sets the jobTitle value equal to jobTitleValue.
    })
  }

  // Function to update the state for newClient, updating companyName.
  function handleCompanyName(companyNameValue) {
    setNewClient({
      ...newClient, // Takes the spread value of the new client.
      companyName: companyNameValue // Sets the companyName value equal to companyNameValue.
    })
  }

  // Function to update the state for newClient, updating phone.
  function handlePhone(phoneValue) {
    setNewClient({
      ...newClient, // Takes the spread value of the new client.
      phone: phoneValue // Sets the phone value equal to phoneValue.
    })
  }

  // Function to update the state for newClient, updating email.
  function handleEmail(emailValue) {
    setNewClient({
      ...newClient, // Takes the spread value of the new client.
      email: emailValue // Sets the email value equal to emailValue.
    })
  }
  
  /* Const state variable indicating whether the update client modal will be 
  diplayed or not. Initial value set to false, so modal not shown at start. */
  const [showModal, setShowModal] = useState(false);

  /* Const state variable indicating that the initial state has no client
  object selected; so no current client to update. */
  const [currentClient, setCurrentClient] = useState(null);
  
  /* useEffect takes an anonymous function that gets the clients one time through. 
  This will allow re-rendering by updating state with getClients(). */
  useEffect(() => {
    fetch(API_URL) // Get clients from the API.
      .then((data) => data.json()) // Converts the data to JSON.
      .then((data) => setClients(data)) // setClients to result of that data.
  }, []);

  // Function for getClients. --> GET or Read
  const getClients = () => {
    console.log('getClients function - Read')
    fetch(API_URL) // Get clients from the API.
      .then((data) => data.json()) // Converts the data to JSON.
      .then((data) => setClients(data)) // setClients to result of that data.
  }

  // Function for postNewClient. --> POST or Create
  const postNewClient = (e) => {
    e.preventDefault() // Prevents automatic refresh, no longer resubmitting the form.
    console.log('postNewClient function - Create')
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClient), // Created a new variable called newClient.
    }).then(() => getClients()) // Re-renders our component with the updated information.

    // setNewClient so that the form clears after clicking on submit.
    setNewClient({
      name: '',
      jobTitle: '',
      companyName: '',
      phone: '',
      email: ''
    })
  }

  // Function for deleteClient. Targeting by ID. --> DELETE or Delete
  const deleteClient = (id) => {
    console.log('deleteClient function - Delete')
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    }).then(() => getClients()) // Re-renders our component with the updated information.
  }

  // Function to open the update client modal for the selected client.
  const openUpdateModal = (client) => {
    setCurrentClient(client)
    setShowModal(true)
  }

  // Function to close the update client modal and change back to no client selected.
  const closeUpdateModal = () => {
    setShowModal(false)
    setCurrentClient(null)
  }

  /* Function to handle updates on the current client selected within the modal. 
  Field is: name, jobTitle, companyName, phone, and email. 
  Value is the input. */
  const handleUpdateChange = (field, value) => {
    if (currentClient) {
      setCurrentClient({
        ...currentClient, // Takes the spread value of the current client.
        [field]: value // Sets the field to the input value. 
      })
    }
  }

  /* Function to save the updated information on the update client modal. 
  --> PUT or Update. */
  const saveUpdatedClient = (e) => {
    e.preventDefault() // Prevents automatic refresh, no longer resubmitting the form.
    console.log('saveUpdateClient function - Update')
    fetch(`${API_URL}/${currentClient.id}`, { // Takes the ID of the current client.
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentClient),
    }).then(() => {
      getClients() // Re-renders our component with the updated information.
      closeUpdateModal() // Close the update client modal.
    })
  }

  /* In ClientForm, the postNewClient function is passed in in order to add new 
  clients to the list. All handle functions are passed in so that the form will be
  able to work as intended. newClient is passed in to allow the form to clear on submit.

  In ClientList, the variable clients is passed in so the clients can be rendered
  on the page. The functions deleteClient and openUpdateModal are passed in so clients
  can be deleted and updated respectively. 
  
  showModal && currentClient && (<UpdateClientModal.../>) are passed in so the modal
  will pop up on screen to update and save an existing client along with closing the
  modal.
  */
  return (
    <div className="App">
      <br></br>
      <ClientForm
        postNewClient={postNewClient}
        handleName={handleName}
        handleJobTitle={handleJobTitle}
        handleCompanyName={handleCompanyName}
        handlePhone={handlePhone}
        handleEmail={handleEmail}
        newClient={newClient}
      />
      <br></br>
      <ClientList
        clients={clients}
        deleteClient={deleteClient}
        openUpdateModal={openUpdateModal}
      />
      {showModal && currentClient && (
        <UpdateClientModal
          showModal={showModal}
          closeUpdateModal={closeUpdateModal}
          saveUpdatedClient={saveUpdatedClient}
          currentClient={currentClient}
          handleUpdateChange={handleUpdateChange}
        />
      )}
    </div>
  )
}

export default App;