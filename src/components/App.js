import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import api from '../api/contacts';

function App() {

  const [contacts, setContacts] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchContacts = async () => {
    const response = await api.get('/contacts');
    return response.data;
  }

  const addContactHandler = async (contact, isEdit = false) => {
    if (isEdit)
      await api.patch(`/contacts/${contact.id}`, contact);
    else
      await api.post("/contacts", contact);
    setContacts([...contacts, contact]);
    window.location.href = '/';
  };

  const deleteContactHandler = async (id) => {
    const isDelete = window.confirm('Confirm Modification?');
    if (isDelete) {
      const newContactList = contacts.filter((contact) => {
        return contact.id !== id;
      });
      setContacts(newContactList);
      await api.delete(`contacts/${id}`);
    }
  };

  const searchContactHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await fetchContacts();
      if (allContacts) setContacts(allContacts);
    }
    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <div className="ui main text container" style={{ marginTop: '7em' }}>
          <Routes>
            <Route path="/" element={<ContactList
              contacts={searchResult < 1 ? contacts : searchResult}
              searchTerm={searchTerm}
              deleteContactHandler={deleteContactHandler}
              searchKeyword={searchContactHandler}
            />} />
            <Route path="/add/:id?" element={<AddContact addContactHandler={addContactHandler} />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
