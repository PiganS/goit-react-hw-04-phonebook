import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container, Subtitle, Title } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsLocalStorage = localStorage.getItem('contactList');
    return contactsLocalStorage
      ? JSON.parse(contactsLocalStorage)
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459 12 56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443 89 12' },
          { id: 'id-3', name: 'Eden Clements', number: '645 17 79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227 91 26' },
        ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setFilter(value);
  };

  const addsNewContact = newContact => {
    const hasDuplicates = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (hasDuplicates) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const filterElements = contacts => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteProduct = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = filterElements(contacts);

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addsNewContact} />
      <Subtitle>Contacts</Subtitle>
      <Filter value={filter} onChange={handleChange} />
      <ContactList
        contacts={filteredContacts}
        handleDeleteProduct={handleDeleteProduct}
      />
    </Container>
  );
};
